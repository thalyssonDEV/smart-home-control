from django.shortcuts import render
from rest_framework import generics, viewsets
from ..models import Device
from ..serializers import DeviceSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by('id')
    serializer_class = DeviceSerializer

    filterset_fields = ['name', 'room', 'state', 'icon']