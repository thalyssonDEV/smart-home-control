from django.shortcuts import render
from rest_framework import generics, viewsets, status
from ..models import Scene, Task, Device
from rest_framework.decorators import action
from rest_framework.response import Response
from ..serializers import SceneSerializer, DeviceSerializer
import time


class SceneViewSet(viewsets.ModelViewSet):
    queryset = Scene.objects.all().order_by('id')
    serializer_class = SceneSerializer

    filterset_fields = ['name', 'state', 'in_progress']

    @action(detail=True, methods=['post'])
    def run(self, request, pk=None):
        """
        Executa a sequência de tarefas de uma cena, respeitando os timers.
        """
        try:
            scene = Scene.objects.get(pk=pk)
            if scene.in_progress:
                return Response(
                    {"error": "A cena já está em execução."},
                    status=status.HTTP_409_CONFLICT
                )

            scene.in_progress = True
            scene.save()

            tasks = Task.objects.filter(scene=scene, active=True).order_by('order')

            for task in tasks:
                device = task.device
                device.state = task.action
                device.save()
                
                if task.timer and task.timer > 0:
                    time.sleep(task.timer)

            scene.in_progress = False
            scene.save()

            serializer = TaskSerializer(tasks_to_run, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Scene.DoesNotExist:
            return Response({"error": "Cena não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            try:
                scene = Scene.objects.get(pk=pk)
                scene.in_progress = False
                scene.save()
            except Scene.DoesNotExist:
                pass
            
            return Response(
                {"error": f"Ocorreu um erro durante a execução: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
