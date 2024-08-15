from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import blogserializer

@api_view(['GET', 'POST'])
def blogs(request):
    if request.method == 'GET':
        blogs = Post.objects.all()
        serializer = blogserializer(blogs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = blogserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def get_or_update_or_delete_post(request, id):
    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = blogserializer(post)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = blogserializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)