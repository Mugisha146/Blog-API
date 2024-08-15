from django.urls import path
from . import views

urlpatterns = [
    path('api/blogs/', views.blogs, name='blogs'),  
    path('api/blogs/<int:id>/', views.get_or_update_or_delete_post, name='get_or_update_or_delete_post'),
]