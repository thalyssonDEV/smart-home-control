from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'rooms', views.RoomViewSet, basename='room')
router.register(r'devices', views.DeviceViewSet, basename='device')
router.register(r'scenes', views.SceneViewSet, basename='scene')
router.register(r'tasks', views.TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('scenes/<int:scene_id>/tasks/', views.TasksInSceneListCreateView.as_view(), name='task-list-create-by-scene'),
    path('scenes/<int:scene_id>/reorder-tasks/', views.ReorderTasksView.as_view(), name='reorder-tasks-in-scene'),
]