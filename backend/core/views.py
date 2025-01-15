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
    TimeSlotEditPriceSerializer,
    TimeSlotSerializer,
)


class RegisterCommercialView(APIView):
    """
    View for registering a new commercial brewery user. Class allows any user to access this view.

    This view supports HTTP methods:
    - POST: Accepts the commercial brewery registration data, validates it,
            creates a new user, and returns an authentication token (refresh and access tokens).
            If registration fails, it returns validation errors.

    Responses:
        - 201 Created: If the registration is successful, the response contains
          the access and refresh tokens, a success message and user type.
        - 400 Bad Request: If the registration data is invalid, the response
          contains error messages related to the registration data.
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """
    View for registering a new contract brewery user. Class allows any user to access this view.

    This view supports HTTP methods:
    - POST: Accepts the contract brewery registration data, validates it,
            creates a new user, and returns an authentication token (refresh and access tokens).
            If registration fails, it returns validation errors.

    Responses:
        - 201 Created: If the registration is successful, the response contains
          the access and refresh tokens, a success message and user type.
        - 400 Bad Request: If the registration data is invalid, the response
          contains error messages related to the registration data.
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """
    View for logging into existing account. Class allows any user to access this view.

    This view supports HTTP methods:
    - POST: Accepts the user login data, validates it and logs the user in.
            If login process fails, it returns validation errors.

    Responses:
        - 201 Created: If the registration is successful, the response contains
          the access and refresh tokens, an user and brewery ids and user type.
        - 400 Bad Request: If the credentials are invalid, the response
          contains error messages related to the credentials.
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """View for checking if a username is unique. Class allows any user to access this view.

    This view supports HTTP methods:
    - POST: Accepts the username data, validates it and checks if the username is unique.
            If the username is unique, it returns a success message.
            If the username is not unique, it returns an error message.

    Responses:
        - 200 OK: If the username is unique, the response contains a success message.
        - 200 OK: If the username is not unique, the response contains an error message
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """View for creating a new device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the device data, validates it and creates a new device.
            If the device creation is successful, it returns a success message.
            If the device creation fails, it returns validation errors.

    Responses:
        - 201 Created: If the device is successfully created, the response contains
          a success message and the device id.
        - 400 Bad Request: If the device creation fails, the response contains
          error messages related to the device data.
        - 403 Forbidden: If the user is not authorized to add devices for this brewery,
          the response contains an error message.
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """View for listing devices for a specific brewery. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the brewery id, validates it and returns a list of devices for the brewery.
            If the user is not authorized to view devices for this brewery, it returns an error message.

    Responses:
        - 200 OK: If the user is authorized to view devices for this brewery, the response contains
          a list of devices for the brewery.
        - 403 Forbidden: If the user is not authorized to view devices for this brewery,
          the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
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
    """View for listing all devices. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of all devices.
            If the user is not authorized to view all devices, it returns an error message.

    Responses:
        - 200 OK: If the user is authorized to view all devices, the response contains
          a list of all devices.
        - 403 Forbidden: If the user is not authorized to view all devices,
          the response contains an error message
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
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
    """View for creating a new time slot. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the time slot data, validates it and creates a new time slot.
            If the time slot creation is successful, it returns a success message.
            If the time slot creation fails, it returns validation errors.

    Responses:
        - 201 Created: If the time slot is successfully created, the response contains
          a success message and the time slot id.
        - 400 Bad Request: If the time slot creation fails, the response contains
          error messages related to the time slot data.
        - 403 Forbidden: If the user is not authorized to add time slots for this device,
          the response contains an error message.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
        - 405 Method Not Allowed: If a GET request is made to this endpoint,
          the response indicates that only POST is allowed.
    """
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
    """View for listing all time slots for a specific device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the device id, validates it and returns a list of time slots for the device.

    Responses:
        - 200 OK: If the time slots are successfully retrieved, the response contains
            a list of time slots for the device.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
    """
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


class TimeSlotEditPriceView(APIView):
    """View for editing the price of a time slot. Class allows only authenticated users to access this view.
    This view supports HTTP methods:
    - POST: Accepts the time slot id and new price, validates the data and updates the price of the time slot.
            If the price update is successful, it returns a success message.
            If the price update fails, it returns validation errors.
    Responses:
        - 200 OK: If the price is successfully updated, the response contains a success message.
        - 400 Bad Request: If the price update fails, the response contains error messages related to the price data.
        - 403 Forbidden: If the user is not authorized to edit the price of this time slot, the response contains an error message.
        - 404 Not Found: If the time slot or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            time_slot_id = request.data.get("time_slot_id")
            time_slot = TimeSlot.objects.get(id=time_slot_id)

            profile = Profile.objects.get(user=user)
            if profile.commercial_brewery != time_slot.device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to edit the price of this time slot."},
                    status=status.HTTP_403_FORBIDDEN
                )
        except TimeSlot.DoesNotExist:
            return Response({"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

        data = {"price": request.data.get("new_price")}

        serializer = TimeSlotEditPriceSerializer(time_slot, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Time slot price successfully updated."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DevicesWithTimeSlotsView(APIView):
    """View for listing all devices with time slots for a specific brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the brewery id, validates it and returns a list of devices with time slots for the brewery.

    Responses:
        - 200 OK: If the devices with time slots are successfully retrieved, the response contains
            a list of devices with time slots for the brewery.
        - 403 Forbidden: If the user is not authorized to view devices with time slots for this brewery,
            the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
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
