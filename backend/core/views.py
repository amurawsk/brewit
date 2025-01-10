from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Device, Profile, TimeSlot
from .serializers import (
    CheckUsernameUniqueSerializer,
    DeviceSerializer,
    DeviceWithTimeSlotsSerializer,
    LoginSerializer,
    RegisterCommercialSerializer,
    RegisterContractSerializer,
    TimeSlotSerializer,
)


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


class RegisterContractView(APIView):
    permission_classes = [AllowAny]

    def get(self, _):
        return Response(
            {"message": "This endpoint only supports POST requests."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request):
        serializer = RegisterContractSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "message": "User registered successfully!",
                    "user_type": "contract_brewery",
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
            user_type = serializer.validated_data['user_type']
            user_id = serializer.validated_data['user_id']
            brewery_id = serializer.validated_data['brewery_id']
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "message": "Login successful!",
                    "user_type": user_type,
                    "user_id": user_id,
                    "brewery_id": brewery_id
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


class DeviceCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        try:
            profile = Profile.objects.get(user=user)
            if profile.commercial_brewery is None:
                return Response(
                    {"error": "Unauthorized to add devices for this brewery."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        commercial_brewery = profile.commercial_brewery
        request.data['commercial_brewery'] = commercial_brewery.id

        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            device = serializer.save(commercial_brewery=commercial_brewery)
            return Response({"message": "Device successfully created.", "id": device.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeviceListForBreweryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, brewery_id):
        user = request.user

        try:
            profile = Profile.objects.get(user=user)
            if (
                profile.contract_brewery or
                (profile.commercial_brewery and profile.commercial_brewery.id == int(brewery_id))
            ):
                devices = Device.objects.filter(commercial_brewery_id=brewery_id)
            else:
                return Response(
                    {"error": "Unauthorized to view devices for this brewery."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeviceListAllView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery is None:
                return Response(
                    {"error": "Unauthorized to view all devices."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TimeSlotCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, device_id):
        user = request.user

        try:
            device = Device.objects.get(id=device_id)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery is not None:
                return Response(
                    {"error": "Unauthorized to add time slots for this user."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            if profile.commercial_brewery != device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to add time slots for this device."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Device.DoesNotExist:
            return Response(
                {"error": "Device not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = TimeSlotSerializer(data=request.data)
        if serializer.is_valid():
            time_slot = serializer.save(device=device)
            return Response({"message": "Time slot successfully created.", "id": time_slot.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, device_id):
        user = request.user
        try:
            device = Device.objects.get(id=device_id)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery is None and profile.commercial_brewery != device.commercial_brewery:
                return Response({"error": "Unauthorized to view time slots for this device."}, status=status.HTTP_403_FORBIDDEN)
        except Device.DoesNotExist:
            return Response({"error": "Device not found."}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

        time_slots = TimeSlot.objects.filter(device=device)
        serializer = TimeSlotSerializer(time_slots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DevicesWithTimeSlotsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, brewery_id):
        user = request.user

        try:
            profile = user.profile
            commercial_brewery = profile.commercial_brewery
            if not commercial_brewery or commercial_brewery.id != brewery_id:
                return Response(
                    {"error": "Unauthorized to view devices with time slots for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        devices = Device.objects.filter(commercial_brewery_id=brewery_id)
        serializer = DeviceWithTimeSlotsSerializer(devices, many=True)
        return Response(serializer.data, status=200)
