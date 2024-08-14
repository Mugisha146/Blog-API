from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import blogserializer

@api_view(['GET'])
def get_blogs(request):
    blogs = Post.objects.all()
    serializer = blogserializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_post(request):
    serializer = blogserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH'])
def get_or_update_post(request, id):
    post = Post.objects.get(id=id)
    if request.method == 'GET':
        serializer = blogserializer(post)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = blogserializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_post(request, id):
    post = Post.objects.get(id=id)
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
