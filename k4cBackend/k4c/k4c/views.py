
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from k4c.models import Data
from k4c.serializer import DataSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class DataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        app = Data.objects.all()
        serializer = DataSerializer(app, many=True)
        return Response(serializer.data)
