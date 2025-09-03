from django.shortcuts import render
from django.db import transaction
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..models import Task, Scene
from ..serializers import TaskSerializer, TaskSceneContextSerializer
from django.db.models import F


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer

    filterset_fields = ['device', 'scene', 'active', 'action', 'timer', 'order']
    

class TasksInSceneListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSceneContextSerializer

    filterset_fields = ['active', 'action', 'device']

    def get_queryset(self):
        scene_id = self.kwargs['scene_id']

        return Task.objects.filter(scene_id=scene_id).order_by('order')
    
    def perform_create(self, serializer):
        scene_id = self.kwargs['scene_id']

        scene = Scene.objects.get(pk=scene_id)

        serializer.save(scene=scene)


class ReorderTasksView(APIView):
    def post(self, request, scene_id):

        task_ids = request.data.get('ordered_task_ids', []) 

        all_tasks = Task.objects.filter(scene_id=scene_id)
        all_task_ids = set(task.id for task in all_tasks)

        if not task_ids:
            return Response(
                {"detail": "Task list not provided."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        if len(task_ids) != len(set(task_ids)):
            return Response({"detail": "Duplicate IDs are not allowed."}, status=status.HTTP_400_BAD_REQUEST)

        tasks = Task.objects.filter(scene_id=scene_id, pk__in=task_ids)

        if tasks.count() != len(task_ids):
            return Response(
                {"detail": "Invalid or non-scene IDs."},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        if set(task_ids) != all_task_ids:
            return Response(
                {"detail": "You must send all task IDs in the scene to reorder."},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():
            Task.objects.filter(scene_id=scene_id).update(order=F('order') + 1000)

            for new_order, task_id in enumerate(task_ids, start=1):
                Task.objects.filter(pk=task_id, scene_id=scene_id).update(order=new_order)

        updated_tasks = Task.objects.filter(scene_id=scene_id).order_by('order')
        serializer = TaskSerializer(updated_tasks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)