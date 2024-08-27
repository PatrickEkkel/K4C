
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from k4c.models import Data
from k4c.serializer import DataSerializer


# Create your views here.
@api_view(['GET'])
def get_data(request):
    app = Data.objects.all()
    serializer = DataSerializer(app, many=True)
    return Response(serializer.data)
