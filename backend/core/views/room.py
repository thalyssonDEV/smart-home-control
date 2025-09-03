from django.shortcuts import render
from rest_framework import generics, viewsets
from ..models import Room
from ..serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all().order_by('id')
    serializer_class = RoomSerializer

    filterset_fields = ['name', 'icon']