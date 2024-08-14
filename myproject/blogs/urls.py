from django.urls import path
from . import views

urlpatterns = [
    path('api/blogs/', views.get_blogs, name='get_blogs'),
    path('api/blogs/', views.create_post, name='create_post'),
    path('api/blogs/<int:id>/', views.get_or_update_post, name='get_or_update_post'),
    path('api/blogs/<int:id>/', views.delete_post, name='delete_post'),
]