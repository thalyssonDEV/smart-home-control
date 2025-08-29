from django.shortcuts import render
from rest_framework import generics, viewsets
from ..models import Task, Scene
from ..serializers import TaskSerializer, TaskSceneContextSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
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