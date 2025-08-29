from rest_framework import serializers
from .models import Room, Device, Scene, Task

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'icon']
        read_only_fields = ['id']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'icon', 'state', 'room']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        if 'state' in validated_data:
            return super().update(instance, validated_data)
        else:
            instance.toggle_state()
            return instance
        

class TaskSceneContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'device', 'scene', 'active', 'action', 'timer', 'order']
        read_only_fields = ['id', 'scene', 'order']


    def validate_timer(self, value):
        if value < 0:
            raise serializers.ValidationError("The interval cannot be negative")
        return value
    

    def validate_order(self, value):
        scene = self.instance.scene if self.instance else self.initial_data.get('scene')
        if Task.objects.filter(scene=scene, order=value).exclude(pk=getattr(self.instance, 'pk', None)).exists():
            raise serializers.ValidationError("This order already exists in the scene")
        return value
    

class TaskSerializer(TaskSceneContextSerializer): 
    class Meta(TaskSceneContextSerializer.Meta): 
        read_only_fields = ['id', 'order'] 
    

class SceneSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Scene
        fields = ['id', 'name', 'state', 'in_progress', 'tasks']
        read_only_fields = ['id']
