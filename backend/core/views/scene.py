from django.shortcuts import render
from rest_framework import generics, viewsets
from ..models import Scene
from ..serializers import SceneSerializer

class SceneViewSet(viewsets.ModelViewSet):
    queryset = Scene.objects.all()
    serializer_class = SceneSerializer

    filterset_fields = ['name', 'state', 'in_progress']