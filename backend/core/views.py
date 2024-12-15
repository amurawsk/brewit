from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CheckUsernameUniqueSerializer, LoginSerializer, RegisterCommercialSerializer


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. Welcome to the index page")


class RegisterCommercialView(APIView):
    permission_classes = [AllowAny]

    def get(self, _):
        return Response(
            {"message": "This endpoint only supports POST requests."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request):
        serializer = RegisterCommercialSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "message": "User registered successfully!",
                    "user_type": "commercial_brewery",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            # Check if the user has an associated commercial or contract brewery
            if hasattr(user.profile, 'commercial_brewery'):
                user_type = 'commercial_brewery'
            elif hasattr(user.profile, 'contract_brewery'):
                user_type = 'contract_brewery'
            else:
                user_type = 'unknown'

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "message": "Login successful!",
                    "user_type": user_type,  # Include user type in response
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckUsernameUniqueView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CheckUsernameUniqueSerializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {
                    "unique": True,
                    "message": "Username is available."
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "unique": False,
                "message": "This username is already taken."
            },
            status=status.HTTP_200_OK
        )
