from datetime import timezone as dt_timezone, datetime, timedelta
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    Device,
    Profile,
    TimeSlot,
    CommercialBrewery,
    ContractBrewery,
    Recipe,
    Order,
    Stage,
    DeviceType,
    Ingredient
)
from django.db.models import Count
from .serializers import (
    BreweryWithDevicesNumberSerializer,
    CheckUsernameUniqueSerializer,
    ContractBrewerySerializer,
    DeviceSerializer,
    DeviceWithFreeTimeSlotsSerializer,
    DeviceWithTimeSlotsSerializer,
    LoginSerializer,
    OrderRateSerializer,
    OrderSerializer,
    OrderWithTimeSlotsAndAllBreweriesInfoSerializer,
    OrderWithTimeSlotsAndCommercialInfoSerializer,
    OrderWithTimeSlotsAndContractInfoSerializer,
    OrderWithTimeSlotsSerializer,
    RegisterCommercialSerializer,
    RegisterContractSerializer,
    SimpleContractBrewerySerializer,
    TimeSlotEditPriceSerializer,
    TimeSlotSerializer,
)
from . import serializers
from django.contrib.auth.models import User
from django.db.utils import IntegrityError, DataError
from django.contrib.auth.hashers import make_password
from measurement.measures import Volume, Time


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
                devices = Device.objects.filter(commercial_brewery_id=brewery_id, is_deleted=False)
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

        devices = Device.objects.filter(is_deleted=False)
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeviceDetailView(APIView):
    """View for retrieving details of a device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the device id, validates it and returns the details of the device.
            If the user is not authorized to view this device, it returns an error message.

    Responses:
        - 200 OK: If the user is authorized to view this device, the response contains
          the details of the device.
        - 403 Forbidden: If the user is not authorized to view this device, the response contains an error message.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, device_id):
        user = request.user

        try:
            device = Device.objects.get(id=device_id, is_deleted=False)
            profile = Profile.objects.get(user=user)
            if (
                profile.contract_brewery is None and
                profile.commercial_brewery != device.commercial_brewery and
                not profile.is_intermediary
            ):
                return Response(
                    {"error": "Unauthorized to view this device."},
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

        serializer = DeviceSerializer(device)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeviceEditView(APIView):
    """View for editing a device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the device id and new data, validates it and updates the device.
            If the device update is successful, it returns a success message.
            If the device update fails, it returns validation errors.

    Responses:
        - 200 OK: If the device is successfully updated, the response contains a success message.
        - 400 Bad Request: If the device update fails, the response contains error messages related to the device data.
        - 403 Forbidden: If the user is not authorized to edit this device, the response contains an error message.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, device_id):
        user = request.user

        try:
            device = Device.objects.get(id=device_id, is_deleted=False)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery is None and profile.commercial_brewery != device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to edit this device."},
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

        serializer = DeviceSerializer(device, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Device successfully updated."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeviceDeleteView(APIView):
    """View for deleting a device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the device id, validates it and deletes the device.
            If the device deletion is successful, it returns a success message.
            If the device deletion fails, it returns an error message.

    Responses:
        - 200 OK: If the device is successfully deleted, the response contains a success message.
        - 403 Forbidden: If the user is not authorized to delete this device, the response contains an error message.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, device_id):
        user = request.user

        try:
            device = Device.objects.get(id=device_id, is_deleted=False)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery is None and profile.commercial_brewery != device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to delete this device."},
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

        # checking if all timeslots are in the past, status = U or soft deleted
        # so reject if there are timeslots with status F R H that are not in the past
        time_slots = TimeSlot.objects.filter(device=device, is_deleted=False)
        for time_slot in time_slots:
            if time_slot.status in ["F", "R", "H"] and time_slot.end_timestamp > timezone.now():
                return Response(
                    {"error": "Cannot delete device with active time slots. Delete the time slots first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        device.delete()
        return Response({"message": "Device successfully deleted."}, status=status.HTTP_200_OK)


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
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, device_id):
        user = request.user

        try:
            device = Device.objects.get(id=device_id, is_deleted=False)
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

        time_slot_status = request.data.get("status")
        slot_type = request.data.get("slot_type")
        price = request.data.get("price")
        start_timestamp_str = request.data.get("start_timestamp")
        end_timestamp_str = request.data.get("end_timestamp")

        try:
            start_timestamp = datetime.fromisoformat(start_timestamp_str)
        except ValueError:
            return Response(
                {"error": "Invalid start timestamp format."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            end_timestamp = datetime.fromisoformat(end_timestamp_str)
        except ValueError:
            return Response(
                {"error": "Invalid end timestamp format."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if start_timestamp >= end_timestamp:
            return Response(
                {"error": "Start time must be before end time."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        overlapping_slots = TimeSlot.objects.filter(
            device=device,
            is_deleted=False,
            start_timestamp__lt=end_timestamp,
            end_timestamp__gt=start_timestamp,
        )
        if overlapping_slots.exists():
            return Response(
                {"error": "Overlapping time slots already exist. Cannot create new time slots."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        time_slots = []
        if slot_type == "H":
            if device.device_type not in ["BT", "BE"]:
                return Response(
                    {"error": "Invalid slot type for device type."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            while start_timestamp + timedelta(hours=1) <= end_timestamp:
                time_slot_data = {
                    "status": time_slot_status,
                    "slot_type": slot_type,
                    "price": price,
                    "start_timestamp": start_timestamp,
                    "end_timestamp": start_timestamp + timedelta(hours=1),
                    "device": device.id,
                }
                serializer = TimeSlotSerializer(data=time_slot_data)
                if serializer.is_valid():
                    time_slot = serializer.save(device=device)
                    time_slots.append(time_slot)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                start_timestamp += timedelta(hours=1)
        elif slot_type == "D":
            if device.device_type not in ["FT", "AC"]:
                return Response(
                    {"error": "Invalid slot type for device type."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            local_tz = timezone.get_current_timezone()
            if timezone.is_naive(start_timestamp):
                start_timestamp = timezone.make_aware(start_timestamp, timezone.utc)
            start_timestamp = timezone.localtime(start_timestamp, local_tz).replace(hour=0, minute=0, second=0)

            if timezone.is_naive(end_timestamp):
                end_timestamp = timezone.make_aware(end_timestamp, timezone.utc)
            end_timestamp = timezone.localtime(end_timestamp, local_tz).replace(hour=23, minute=59, second=59)
            end_timestamp -= timedelta(days=1)

            while start_timestamp <= end_timestamp:
                time_slot_data = {
                    "status": time_slot_status,
                    "slot_type": slot_type,
                    "price": price,
                    "start_timestamp": start_timestamp.astimezone(dt_timezone.utc),
                    "end_timestamp": start_timestamp.replace(hour=23, minute=59, second=59).astimezone(dt_timezone.utc),
                    "device": device.id,
                }
                serializer = TimeSlotSerializer(data=time_slot_data)
                if serializer.is_valid():
                    time_slot = serializer.save(device=device)
                    time_slots.append(time_slot)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                start_timestamp += timedelta(days=1)
        else:
            return Response(
                {"error": "Invalid slot type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": "Time slots successfully created.", "ids": [time_slot.id for time_slot in time_slots]},
            status=status.HTTP_201_CREATED
        )


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

        time_slots = TimeSlot.objects.filter(device=device, is_deleted=False)
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


class TimeSlotDeleteView(APIView):
    """View for deleting a time slot. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the time slot id, validates it and deletes the time slot.
            If the time slot deletion is successful, it returns a success message.
            If the time slot deletion fails, it returns an error message.

    Responses:
        - 200 OK: If the time slot is successfully deleted, the response contains a success message.
        - 403 Forbidden: If the user is not authorized to delete this time slot, the response contains an error message.
        - 404 Not Found: If the time slot or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, time_slot_id):
        user = request.user
        try:
            time_slot = TimeSlot.objects.get(id=time_slot_id, is_deleted=False)

            profile = Profile.objects.get(user=user)
            if profile.commercial_brewery != time_slot.device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to delete this time slot."},
                    status=status.HTTP_403_FORBIDDEN
                )
        except TimeSlot.DoesNotExist:
            return Response({"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

        if time_slot.order:
            if time_slot.order.status == "P":
                return Response(
                    {"error": "Cannot delete time slot with an order in the past."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if time_slot.order.status != "R":
                return Response(
                    {"error": "Cannot delete time slot with an active order. Delete the order first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        time_slot.delete()
        return Response({"message": "Time slot successfully deleted."}, status=status.HTTP_200_OK)


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
            if not profile.contract_brewery and not profile.is_intermediary and commercial_brewery.id != brewery_id:
                return Response(
                    {"error": "Unauthorized to view devices with time slots for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        devices = Device.objects.filter(commercial_brewery_id=brewery_id, is_deleted=False)
        serializer = DeviceWithTimeSlotsSerializer(devices, many=True)
        return Response(serializer.data, status=200)


class CommercialBreweryInfoView(APIView):
    """View for listing commercial brewery's info with orders and devices.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the brewery id, validates it and returns a response.

    Responses:
        - 200 OK: If the brewery is successfully retrieved
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the brewery was not found

    - POST: Accept the brewery id, gets {name}, {email}, {phone_number},
    {nip}, {address}, {description} from request body, validates them and
    returns a response

    Responses:
        - 200 OK: If the brewery was updated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the brewery was not found
    """
    permission_classes = [IsAuthenticated]

    def get(self, _, brewery_id):
        try:
            brewery = CommercialBrewery.objects.get(pk=brewery_id)
            serializer = serializers.CommercialBreweryInfoSerializer(brewery)
            return Response(serializer.data, status=200)
        except CommercialBrewery.DoesNotExist:
            return Response(
                {"error": 'Commercial brewery not found.'},
                status=404
            )

    def post(self, request, brewery_id):
        profile = request.user.profile
        try:
            brewery = CommercialBrewery.objects.get(pk=brewery_id)
            serializer = serializers.CommercialBreweryUpdateSerializer(
                data=request.data
            )
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            if (
                (profile.commercial_brewery != brewery
                 and (profile.commercial_brewery is not None
                      or profile.contract_brewery is not None)
                 )
            ):
                return Response(
                    {
                        "error": ("User is not authorized to change this"
                                  " brewery's informations")
                    }
                )
            brewery.name = serializer.data["name"]
            brewery.contract_email = serializer.data["email"]
            brewery.contract_phone_number = serializer.data["phone_number"]
            brewery.nip = serializer.data["nip"]
            brewery.address = serializer.data["address"]
            brewery.description = serializer.data["description"]
            brewery.save()
            return Response(
                {"message": "Commercial brewery's info updated successfully"},
                status=status.HTTP_200_OK
            )
        except CommercialBrewery.DoesNotExist:
            return Response(
                {"error": 'Commercial brewery not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except DataError:
            return Response(
                {"error": "Provided data did not match requirements."},
                status=status.HTTP_403_FORBIDDEN
            )


class ContractBreweryInfoView(APIView):
    """View for listing contract brewery's info with orders.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the brewery id, validates it and returns a response.

    Responses:
        - 200 OK: If the brewery is successfully retrieved
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the brewery was not found

    - POST: Accept the brewery id, gets {name}, {email}, {phone_number},
    {owner_name}, {description} from request body, validates them and
    returns a response

    Responses:
        - 200 OK: If the brewery was updated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the brewery was not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, _, brewery_id):
        try:
            brewery = ContractBrewery.objects.get(pk=brewery_id)
            serializer = serializers.ContractBreweryInfoSerializer(brewery)
            return Response(serializer.data, status=200)
        except ContractBrewery.DoesNotExist:
            return Response(
                {"error": "Contract brewery not found."},
                status=404
            )

    def post(self, request, brewery_id):
        profile = request.user.profile
        try:
            brewery = ContractBrewery.objects.get(pk=brewery_id)
            serializer = serializers.ContractBreweryUpdateSerializer(
                data=request.data
            )
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            if (
                (profile.contract_brewery != brewery
                 and (profile.commercial_brewery is not None
                      or profile.contract_brewery is not None)
                 )
            ):
                return Response(
                    {
                        "error": ("User is not authorized to change this"
                                  " brewery's informations")
                    }
                )
            brewery.name = serializer.data["name"]
            brewery.contract_email = serializer.data["email"]
            brewery.contract_phone_number = serializer.data["phone_number"]
            brewery.owner_name = serializer.data["owner_name"]
            brewery.description = serializer.data["description"]
            brewery.save()
            return Response(
                {"message": "Contract brewery's info updated successfully"},
                status=status.HTTP_200_OK
            )
        except ContractBrewery.DoesNotExist:
            return Response(
                {"error": 'Contract brewery not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except DataError:
            return Response(
                {"error": "Provided data did not match requirements."},
                status=status.HTTP_403_FORBIDDEN
            )


class UserListView(APIView):
    """View for listing all users.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of all users.

    Responses:
        - 200 OK: If the users are successfully retrieved, the response contains
          a list of all users.
        - 403 Forbidden: If the user is not authorized to view all users,
          the response contains an error message.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        try:
            if not profile.is_intermediary:
                return Response(
                    {"error": "Unauthorized to view all users."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        users = Profile.objects.all()
        serializer = serializers.AccountInfoSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommercialAccountInfoView(APIView):
    """View for listing commercial account's info.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the account id, validates it and returns a response.

    Responses:
        - 200 OK: If the account is successfully retrieved
        - 400 Bad Request: If the account is not a commercial account
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the account was not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            if profile.commercial_brewery is None:
                return Response(
                    {
                        "error": ("Requested account is not a commercial "
                                  "brewery account.")
                    },
                    status=400
                )
            serializer = serializers.CommercialAccountInfoSerializer(profile)
            return Response(serializer.data, status=200)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Account not found."},
                status=404
            )


class ContractAccountInfoView(APIView):
    """View for listing contract account's info.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the account id, validates it and returns a response.

    Responses:
        - 200 OK: If the account is successfully retrieved
        - 400 Bad Request: If the account is not a contract account
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the account was not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            if profile.contract_brewery is None:
                return Response(
                    {
                        "error": ("Requested account is not a contract "
                                  "brewery account.")
                    },
                    status=400
                )
            serializer = serializers.ContractAccountInfoSerializer(profile)
            return Response(serializer.data, status=200)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Account not found."},
                status=404
            )


class IntermediaryAccountInfoView(APIView):
    """View for listing intermediary account's info.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the account id, validates it and returns a response.

    Responses:
        - 200 OK: If the account is successfully retrieved
        - 400 Bad Request: If the account is not an intermediary account
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the account was not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            if not profile.is_intermediary:
                return Response(
                    {
                        "error": ("Requested account is not an intermediary "
                                  "account.")
                    },
                    status=400
                )
            serializer = serializers.UserSerializer(profile)
            return Response(serializer.data, status=200)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Account not found."},
                status=404
            )


class CoworkersView(APIView):
    """View for listing coworkers of given account.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the account id, validates it and returns a response.

    Responses:
        - 200 OK: If the coworkers are successfully retrieved
        - 400 Bad Request: If the account is neither commercial nor contract
        - 403 Forbidden: If the user is not authorized
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        coworkers = None
        if (brewery := profile.commercial_brewery) is not None:
            coworkers = Profile.objects.filter(
                commercial_brewery=profile.commercial_brewery,
                user__is_active=True
            ).exclude(pk=profile.pk)
        elif (brewery := profile.contract_brewery) is not None:
            coworkers = Profile.objects.filter(
                contract_brewery=brewery,
                user__is_active=True
            ).exclude(pk=profile.pk)
        elif (profile.is_intermediary):
            coworkers = Profile.objects.filter(
                contract_brewery__isnull=True,
                commercial_brewery__isnull=True,
                user__is_active=True
            ).exclude(pk=profile.pk)
        else:
            return Response(
                {"error": "Improper account type."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = serializers.AccountInfoSerializer(
            coworkers,
            many=True
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveCoworkerView(APIView):
    """View for deactivating given account.
    Class allows only authenticated users to access this view.
    Only users from the same brewery or users can deactivate accounts.

    This view supports HTTP methods:
    - POST: Accepts the "coworker_id", validates it and returns a response.

    Responses:
        - 200 OK: If the account is successfully deactivated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized
        - 404 Not Found: If the account was not found
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = request.user.profile
        serializer = serializers.CoworkerSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            coworker = Profile.objects.get(pk=serializer.data['coworker_id'])
        except Profile.DoesNotExist:
            return Response(
                {"error": "Specified account not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        if (
            (profile.commercial_brewery == coworker.commercial_brewery
                and profile.commercial_brewery is not None)
            or (profile.contract_brewery == coworker.contract_brewery
                and profile.contract_brewery is not None)
            or (profile.contract_brewery is None
                and profile.commercial_brewery is None)
        ):
            coworker_user = coworker.user
            coworker_user.is_active = False
            coworker_user.save()
            return Response(
                f"Successfilly deactivated user of id={coworker.pk}",
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "The user cannot remove specified account."},
                status=status.HTTP_403_FORBIDDEN
            )


class AddCoworkerView(APIView):
    """View for creating an account assigned to the same brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the "coworker_username", "coworker_password", validates it
    and returns a response.

    Responses:
        - 201 Created: If the account is successfully created
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized
        - 409 Not Found: If the provided username is taken
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = request.user.profile
        serializer = serializers.AccountCreationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            coworker = User.objects.create(
                username=serializer.data["coworker_username"],
                password=make_password(serializer.data["coworker_password"])
            )
            Profile.objects.create(
                user=coworker,
                contract_brewery=profile.contract_brewery,
                commercial_brewery=profile.commercial_brewery
            )
            return Response(
                {
                    "message": ("Successfully added coworker"
                                f" {coworker.username}.")
                },
                status=status.HTTP_201_CREATED
            )
        except IntegrityError:
            return Response(
                {"error": "User of provided username already exists."},
                status=status.HTTP_409_CONFLICT
            )


class RecipiesView(APIView):
    """View for recipies of user's brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a response based on user data.

    Responses:
        - 200 OK: If recipies are successfully retrieved
        - 403 Forbidden: If the user is not authorized

    - POST: Accepts "name", "full_volume", validates it and returns a response.

    Responses:
        - 201 Created: If the recipe is successfully created
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        recipies = Recipe.objects.filter(
            contract_brewery=profile.contract_brewery
        )
        serializer = serializers.RecipeSerializer(recipies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"errors": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.RecipeCreationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        recipe = Recipe.objects.create(
            name=serializer.data["name"],
            full_volume=Volume(liter=serializer.data["full_volume"]),
            contract_brewery=brewery
        )
        return Response(
            {
                "message": "Successfully added recipe.",
                "id": recipe.pk
            },
            status=status.HTTP_201_CREATED
        )


class RecipeUpdateView(APIView):
    """View for updating recipies of user's brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts "name", "full_volume", validates it and returns a response.

    Responses:
        - 200 OK: If the recipe is successfully updated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If the recipe was not found.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"errors": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.RecipeUpdateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            recipe = Recipe.objects.get(pk=serializer.data["id"])
            if recipe.contract_brewery != brewery:
                return Response(
                    {"error": "User is not an employee of recipe's brewery."},
                    status=status.HTTP_403_FORBIDDEN
                )
            recipe.name = serializer.data["name"]
            recipe.full_volume = Volume(liter=serializer.data["full_volume"])
            recipe.save()
            return Response(
                {"message": "Recipe updated successfully."},
                status=status.HTTP_200_OK
            )
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class RecipeDeleteView(APIView):
    """View for deleting recipies of user's brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts "id", validates and deletes

    Response:
        - 200 OK: If the recipe has been deleted
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If the recipe was not found
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"errors": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.RecipeRemoveSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            recipe = Recipe.objects.get(pk=serializer.data["id"])
            if recipe.contract_brewery != brewery:
                return Response(
                    {"error": "User is not an employee of recipe's brewery."},
                    status=status.HTTP_403_FORBIDDEN
                )
            _, deleted = recipe.delete()
            return Response(deleted, status.HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class OrderView(APIView):
    """View for orders based on provided recipe.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a response based on user data.

    Responses:
        - 200 OK: If recipies are successfully retrieved
        - 403 Forbidden: If the user is not authorized
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, recipe_id):
        profile = request.user.profile
        try:
            recipe = Recipe.objects.get(pk=recipe_id)
            if profile.contract_brewery != recipe.contract_brewery:
                return Response(
                    {
                        "error": ("Access denied! User is not a representative"
                                  " of the company that owns this recipe!")
                    }
                )
            orders = Order.objects.filter(recipe=recipe)
            serializer = serializers.OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class StageView(APIView):
    """View for stages of user's brewery.
    Class allows only authenticated users to access this view.

    - POST: Accepts "recipe_id", "name", "device", "time" in days,
    "description" validates it and returns a response.

    Responses:
        - 201 Created: If the stage is successfully created
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If Recipe of provided id does not exist
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.StageCreationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            recipe = Recipe.objects.get(pk=serializer.data["recipe_id"])
            if recipe.contract_brewery != brewery:
                return Response(
                    {"error": "User is not an employee of recipe's brewery."},
                    status=status.HTTP_403_FORBIDDEN
                )
            stage = Stage.objects.create(
                name=serializer.data["name"],
                device_type=DeviceType(serializer.data["device"]),
                time=Time(day=serializer.data["time"]),
                description=serializer.data["description"],
                recipe=recipe
            )
            return Response(
                {"message": "Successfully added stage.", "id": stage.id},
                status=status.HTTP_201_CREATED
            )
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {"error": "Illegal device code."},
                status=status.HTTP_400_BAD_REQUEST
            )


class StageDeleteView(APIView):
    """View for deleting stages of user's brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts "stage_id", validates and deletes

    Response:
        - 200 OK: If the stage has been deleted
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If the recipe was not found
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.StageDeleteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            stage = Stage.objects.get(pk=serializer.data["stage_id"])
            if stage.recipe.contract_brewery != brewery:
                return Response(
                    {
                        "error": ("Permission denied: user is an employee of"
                                  " other brewery")
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            _, deleted = stage.delete()
            return Response(deleted, status.HTTP_200_OK)
        except Stage.DoesNotExist:
            return Response(
                {"error": "Stage not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class StageUpdateView(APIView):
    """View for updating stages of user's brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts "id", "name", "device", "time" (in days), "description"
    validates, updates and returns response

    Response:
        - 200 OK: If the stage has been updated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If the stage was not found
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.StageUpdateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            stage = Stage.objects.get(pk=serializer.data["id"])
            if stage.recipe.contract_brewery != brewery:
                return Response(
                    {
                        "error": ("Permission denied: user is an employee of"
                                  " other brewery")
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            stage.name = serializer.data["name"]
            stage.device_type = DeviceType(serializer.data["device"])
            stage.time = Time(day=serializer.data["time"])
            stage.description = serializer.data["description"]
            stage.save()
            return Response(
                {"message": "Stage updated successfully"},
                status.HTTP_200_OK
            )
        except Stage.DoesNotExist:
            return Response(
                {"error": "Stage not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {"error": "Illegal device code."},
                status=status.HTTP_400_BAD_REQUEST
            )


class IngredientCreateView(APIView):
    """View for creating ingredients of user's brewery.
    Class allows only authenticated users to access this view.

    - POST: Accepts "stage_id", "name", "quantity" validates data and returns
    a response.

    Responses:
        - 201 Created: If the ingredient is successfully created
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If stage of provided id does not exist
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.IngredientCreationSerializer(
            data=request.data
        )
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            stage = Stage.objects.get(pk=serializer.data["stage_id"])
            if stage.recipe.contract_brewery != brewery:
                return Response(
                    {
                        "error": ("Permission denied: user is an employee of"
                                  " other brewery")
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            ingredient = Ingredient.objects.create(
                name=serializer.data["name"],
                amount=serializer.data["quantity"],
                stage=stage
            )
            return Response(
                {"message": "Ingredient created successfully", "id": ingredient.id},
                status.HTTP_201_CREATED
            )
        except Stage.DoesNotExist:
            return Response(
                {"error": "Stage not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class IngredientDeleteView(APIView):
    """View for deleting ingredients of user's brewery.
    Class allows only authenticated users to access this view.

    - POST: Accepts "ingredient_id" validates data, deletes object and returns
    a response.

    Responses:
        - 200 OK: If the ingredient has been successfully deleted
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If ingredient of provided id does not exist
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.IngredientDeleteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            ingredient = Ingredient.objects.get(
                pk=serializer.data["ingredient_id"]
            )
            if ingredient.stage.recipe.contract_brewery != brewery:
                return Response(
                    {
                        "error": ("Permission denied: user is an employee of"
                                  " other brewery")
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            _, deleted = ingredient.delete()
            return Response(deleted, status.HTTP_200_OK)
        except Ingredient.DoesNotExist:
            return Response(
                {"error": "Ingredient not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class IngredientUpdateView(APIView):
    """View for updating ingredients of user's brewery.
    Class allows only authenticated users to access this view.

    - POST: Accepts "id", "name", "quantity" validates data and returns
    a response.

    Responses:
        - 200 OK: If the ingredient has been successfully updated
        - 400 Bad Request: If the request body couldn't get properly serialized
        - 403 Forbidden: If the user is not authorized or is not a contract
        brewery employee
        - 404 Not Found: If ingredient of provided id does not exist
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (brewery := request.user.profile.contract_brewery) is None:
            return Response(
                {"error": "User is not a contract brewery employee."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = serializers.IngredientUpdateSerializer(
            data=request.data
        )
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            ingredient = Ingredient.objects.get(pk=serializer.data["id"])
            if ingredient.stage.recipe.contract_brewery != brewery:
                return Response(
                    {
                        "error": ("Permission denied: user is an employee of"
                                  " other brewery")
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            ingredient.name = serializer.data["name"]
            ingredient.amount = serializer.data["quantity"]
            ingredient.save()
            return Response(
                {"message": "Ingredient updated successfully"},
                status.HTTP_200_OK
            )
        except Ingredient.DoesNotExist:
            return Response(
                {"error": "Ingredient not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class DevicesWithFreeTimeSlotsView(APIView):
    """View for listing all devices with available time slots for a specific brewery.
    It is skipping the devices that have no available time slots.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the brewery id, validates it and returns a list of devices with available time slots for the brewery.

    Responses:
        - 200 OK: If the devices with available time slots are successfully retrieved, the response contains
            a list of devices with available time slots for the brewery.
        - 403 Forbidden: If the user is not authorized to view devices with available time slots for this brewery,
            the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, brewery_id):
        user = request.user

        try:
            profile = user.profile
            commercial_brewery = profile.commercial_brewery
            if not profile.contract_brewery and commercial_brewery.id != brewery_id:
                return Response(
                    {"error": "Unauthorized to view devices with available time slots for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        devices = Device.objects.filter(commercial_brewery_id=brewery_id, is_deleted=False)
        devices_with_free_time_slots = []
        for device in devices:
            free_time_slots = TimeSlot.objects.filter(
                device=device,
                status="F",
                is_deleted=False,
                start_timestamp__gte=datetime.now(),
            )
            if free_time_slots.exists():
                devices_with_free_time_slots.append(device)

        serializer = DeviceWithFreeTimeSlotsSerializer(devices_with_free_time_slots, many=True)
        return Response(serializer.data, status=200)


class OrderCreateView(APIView):
    """View for creating a new order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the order data, validates it and creates a new order.
            If the order creation is successful, it returns a success message.
            If the order creation fails, it returns validation errors.

    Responses:
        - 201 Created: If the order is successfully created, the response contains
          a success message and the order id.
        - 400 Bad Request: If the order creation fails, the response contains
          error messages related to the order data.
        - 403 Forbidden: If the user is not authorized to create orders for this device,
          the response contains an error message.
        - 404 Not Found: If the timeslot, device or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            if profile.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to create orders for this user."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        time_slot_ids = request.data.get("time_slot_ids")
        if not time_slot_ids or not isinstance(time_slot_ids, list):
            return Response(
                {"error": "Time slot IDs must be provided as a list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        time_slots = TimeSlot.objects.filter(id__in=time_slot_ids, is_deleted=False)
        if time_slots.count() != len(time_slot_ids):
            return Response(
                {"error": "Invalid time slot ids."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if time_slots.filter(status="R").exists():
            return Response(
                {"error": "Cannot create order for reserved time slots."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if time_slots.filter(status="U").exists():
            return Response(
                {"error": "Cannot create order for unavailable time slots."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if time_slots.filter(status="H").exists():
            return Response(
                {"error": "Cannot create order for hired time slots."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if time_slots.filter(start_timestamp__lt=datetime.now()).exists():
            return Response(
                {"error": "Cannot create order for time slots in the past."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if time_slots.filter(order__isnull=False).exists():
            return Response(
                {"error": "Cannot create order for time slots with active orders."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "beer_type": request.data.get("beer_type"),
            "beer_volume": request.data.get("beer_volume"),
            "description": request.data.get("description"),
            "contract_brewery": profile.contract_brewery.id,
            "recipe": request.data.get("recipe_id"),
        }

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            time_slots.update(order=order, status="R")
            return Response(
                {"message": "Order successfully created.", "id": order.id},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    """View for retrieving details of an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and returns the details of the order.

    Responses:
        - 200 OK: If the order details are successfully retrieved, the response contains
          the details of the order.
        - 403 Forbidden: If the user is not authorized to view the details of this order,
          the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            time_slot = TimeSlot.objects.filter(order=order).first()
            if (
                profile.contract_brewery != order.contract_brewery and
                profile.commercial_brewery != time_slot.device.commercial_brewery
            ):
                return Response(
                    {"error": "Unauthorized to view this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = OrderWithTimeSlotsSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderContractBreweryDetailView(APIView):
    """View for retrieving details of an order for a contract brewery. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and returns the details of the order.

    Responses:
        - 200 OK: If the order details are successfully retrieved, the response contains
          the details of the order.
        - 403 Forbidden: If the user is not authorized to view the details of this order,
          the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            time_slot = TimeSlot.objects.filter(order=order).first()
            if (
                not profile.contract_brewery and
                profile.commercial_brewery != time_slot.device.commercial_brewery and
                not profile.is_intermediary
            ):
                return Response(
                    {"error": "Unauthorized to view this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ContractBrewerySerializer(order.contract_brewery)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderListForDeviceView(APIView):
    """View for listing orders for a specific device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the device id, validates it and returns a list of orders for the device.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of orders for the device.
        - 403 Forbidden: If the user is not authorized to view orders for this device, the response contains an error message.
        - 404 Not Found: If the device or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, device_id):
        user = request.user
        try:
            device = Device.objects.get(id=device_id)
            profile = Profile.objects.get(user=user)
            if profile.commercial_brewery != device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to view orders for this device."},
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

        orders = Order.objects.filter(timeslot__device=device)
        serializer = OrderWithTimeSlotsSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderAcceptView(APIView):
    """View for accepting an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and accepts the order.
            If the order acceptance is successful, it returns a success message.
            If the order acceptance fails, it returns an error message.

    Responses:
        - 200 OK: If the order is successfully accepted, the response contains a success message.
        - 403 Forbidden: If the user is not authorized to accept this order, the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            time_slots = TimeSlot.objects.filter(order=order)
            if profile.commercial_brewery != time_slots.first().device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to accept this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status != "N":
            return Response(
                {"error": "Order is not new. Cannot accept this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = "C"
        order.save()
        time_slots.update(status="H")
        return Response({"message": "Order successfully accepted."}, status=status.HTTP_200_OK)


class OrderRejectView(APIView):
    """View for rejecting an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and rejects the order.
            If the order rejection is successful, it returns a success message.
            If the order rejection fails, it returns an error message.

    Responses:
        - 200 OK: If the order is successfully rejected, the response contains a success message.
        - 403 Forbidden: If the user is not authorized to reject this order, the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            time_slot = TimeSlot.objects.filter(order=order).first()
            if profile.commercial_brewery != time_slot.device.commercial_brewery:
                return Response(
                    {"error": "Unauthorized to reject this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status != "N":
            return Response(
                {"error": "Order is not new. Cannot reject this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = "R"
        order.ended_at = datetime.now()
        order.save()

        time_slots = TimeSlot.objects.filter(order=order)
        new_time_slots = []
        for time_slot in time_slots:
            new_time_slot = TimeSlot(
                price=time_slot.price,
                start_timestamp=time_slot.start_timestamp,
                end_timestamp=time_slot.end_timestamp,
                device=time_slot.device,
                order=None
            )
            new_time_slots.append(new_time_slot)

        time_slots.update(is_deleted=True)
        TimeSlot.objects.bulk_create(new_time_slots)

        return Response(
            {"message": "Order successfully rejected."},
            status=status.HTTP_200_OK
        )


class OrderWithdrawView(APIView):
    """View for withdrawing an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and withdraws the order.
            If the order withdrawal is successful, it returns a success message.
            If the order withdrawal fails, it returns an error message.

    Responses:
        - 200 OK: If the order is successfully withdrawn, the response contains a success message.
        - 403 Forbidden: If the user is not authorized to withdraw this order, the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery != order.contract_brewery:
                return Response(
                    {"error": "Unauthorized to withdraw this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status != "N":
            return Response(
                {"error": "Order is not new. Cannot withdraw this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        time_slots = TimeSlot.objects.filter(order=order)
        time_slots.update(order=None, status="F")

        order.delete()
        return Response(
            {"message": "Order successfully withdrawn."},
            status=status.HTTP_200_OK
        )


class OrderCancelView(APIView):
    """View for cancelling an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the order id, validates it and cancels the order.
            If the order cancellation is successful, it returns a success message.
            If the order cancellation fails, it returns an error message.

    Responses:
        - 200 OK: If the order is successfully cancelled, the response contains a success message.
        - 400 Bad Request: If the order is not confirmed, the response contains an error message.
        - 403 Forbidden: If the user is not authorized to cancel this order, the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            time_slot = TimeSlot.objects.filter(order=order).first()
            if (
                profile.contract_brewery != order.contract_brewery and
                profile.commercial_brewery != time_slot.device.commercial_brewery
            ):
                return Response(
                    {"error": "Unauthorized to cancel this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status != "C":
            return Response(
                {"error": "Order is not confirmed. Cannot cancel this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = "R"
        order.ended_at = datetime.now()
        order.save()

        time_slots = TimeSlot.objects.filter(order=order)
        new_time_slots = []
        for time_slot in time_slots:
            new_time_slot = TimeSlot(
                price=time_slot.price,
                start_timestamp=time_slot.start_timestamp,
                end_timestamp=time_slot.end_timestamp,
                device=time_slot.device,
                order=None
            )
            new_time_slots.append(new_time_slot)

        time_slots.update(is_deleted=True)
        TimeSlot.objects.bulk_create(new_time_slots)

        return Response(
            {"message": "Order successfully cancelled."},
            status=status.HTTP_200_OK
        )


class OrderRateView(APIView):
    """View for rating an order. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - POST: Accepts the order id and rating, validates the data and rates the order.
            If the order rating is successful, it returns a success message.
            If the order rating fails, it returns validation errors.

    Responses:
        - 200 OK: If the order is successfully rated, the response contains a success message.
        - 400 Bad Request: If the order rating fails, the response contains error messages related to the rating data.
        - 403 Forbidden: If the user is not authorized to rate this order, the response contains an error message.
        - 404 Not Found: If the order or user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        user = request.user
        try:
            order = Order.objects.get(id=order_id)
            profile = Profile.objects.get(user=user)
            if profile.contract_brewery != order.contract_brewery:
                return Response(
                    {"error": "Unauthorized to rate this order."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status != "P":
            return Response(
                {"error": "Order is not past. Cannot rate this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {"rate": request.data.get("rate")}

        serializer = OrderRateSerializer(order, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Order successfully rated."},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderListCommercialView(APIView):
    """View for listing orders with specific status for a commercial brewery. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the status, validates them and returns a list of orders with the specific status for the brewery.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of orders with the specific status for the brewery.
        - 403 Forbidden: If the user is not authorized to view orders for this brewery, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, status):
        user = request.user
        try:
            profile = user.profile
            commercial_brewery = profile.commercial_brewery
            if not commercial_brewery:
                return Response(
                    {"error": "Unauthorized to view orders for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        orders = Order.objects.filter(timeslot__device__commercial_brewery=commercial_brewery, status=status).distinct()
        serializer = OrderWithTimeSlotsAndContractInfoSerializer(orders, many=True)
        return Response(serializer.data, status=200)


class OrderCommercialDashboardView(APIView):
    """View for listing up to 3 newest N and C orders for a commercial brewery. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of up to 3 newest N and C orders for the brewery.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of 3 newest N and C orders for the brewery.
        - 403 Forbidden: If the user is not authorized to view orders for this brewery, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile
            commercial_brewery = profile.commercial_brewery
            if not commercial_brewery:
                return Response(
                    {"error": "Unauthorized to view orders for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        new_orders = Order.objects.filter(timeslot__device__commercial_brewery=commercial_brewery, status="N").distinct().order_by("-created_at")[:3]
        confirmed_orders = Order.objects.filter(timeslot__device__commercial_brewery=commercial_brewery, status="C").distinct().order_by("-created_at")[:3]

        new_serializer = OrderWithTimeSlotsAndContractInfoSerializer(new_orders, many=True)
        confirmed_serializer = OrderWithTimeSlotsAndContractInfoSerializer(confirmed_orders, many=True)
        data = {
            "new_orders": new_serializer.data,
            "confirmed_orders": confirmed_serializer.data
        }
        return Response(data, status=200)


class OrderListContractView(APIView):
    """View for listing orders with specific status for a contract brewery. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the status, validates them and returns a list of orders with the specific status for the brewery.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of orders with the specific status for the brewery.
        - 403 Forbidden: If the user is not authorized to view orders for this brewery, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, status):
        user = request.user
        try:
            profile = user.profile
            contract_brewery = profile.contract_brewery
            if not contract_brewery:
                return Response(
                    {"error": "Unauthorized to view orders for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        orders = Order.objects.filter(contract_brewery=contract_brewery, status=status)
        serializer = OrderWithTimeSlotsAndCommercialInfoSerializer(orders, many=True)
        return Response(serializer.data, status=200)


class OrderContractDashboardView(APIView):
    """View for listing up to 3 newest N and C orders for a contract brewery.
    Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of up to 3 newest N and C orders for the brewery.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of 3 newest N and C orders for the brewery.
        - 403 Forbidden: If the user is not authorized to view orders for this brewery, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile
            contract_brewery = profile.contract_brewery
            if not contract_brewery:
                return Response(
                    {"error": "Unauthorized to view orders for this brewery."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        new_orders = Order.objects.filter(contract_brewery=contract_brewery, status="N").order_by("-created_at")[:3]
        confirmed_orders = Order.objects.filter(contract_brewery=contract_brewery, status="C").order_by("-created_at")[:3]

        new_serializer = OrderWithTimeSlotsAndCommercialInfoSerializer(new_orders, many=True)
        confirmed_serializer = OrderWithTimeSlotsAndCommercialInfoSerializer(confirmed_orders, many=True)
        data = {
            "new_orders": new_serializer.data,
            "confirmed_orders": confirmed_serializer.data
        }
        return Response(data, status=200)


class OrderListIntermediaryView(APIView):
    """View for listing all orders with specific status. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Accepts the status, validates them and returns a list of orders with the specific status.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of orders with the specific status.
        - 403 Forbidden: If the user is not authorized to view orders, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, status):
        user = request.user
        try:
            profile = user.profile
            if not profile.is_intermediary:
                return Response(
                    {"error": "Unauthorized to view orders for this intermediary."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        orders = Order.objects.filter(status=status)
        serializer = OrderWithTimeSlotsAndAllBreweriesInfoSerializer(orders, many=True)
        return Response(serializer.data, status=200)


class OrderIntermediaryDashboardView(APIView):
    """View for listing up to 3 newest N and C orders in a system. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of up to 3 newest N and C orders in the system.

    Responses:
        - 200 OK: If the orders are successfully retrieved, the response contains a list of 3 newest N and C orders.
        - 403 Forbidden: If the user is not authorized to view orders for this intermediary, the response contains an error message.
        - 404 Not Found: If the user profile is not found, the response contains an error message.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile
            if not profile.is_intermediary:
                return Response(
                    {"error": "Unauthorized to view orders for this intermediary."},
                    status=403
                )
        except Profile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=404
            )

        new_orders = Order.objects.filter(status="N").order_by("-created_at")[:3]
        confirmed_orders = Order.objects.filter(status="C").order_by("-created_at")[:3]

        new_serializer = OrderWithTimeSlotsAndAllBreweriesInfoSerializer(new_orders, many=True)
        confirmed_serializer = OrderWithTimeSlotsAndAllBreweriesInfoSerializer(confirmed_orders, many=True)
        data = {
            "new_orders": new_serializer.data,
            "confirmed_orders": confirmed_serializer.data
        }
        return Response(data, status=200)


class BreweryWithDevicesNumberView(APIView):
    """View for listing all breweries with the number of devices for each brewery with any device. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of all breweries with the number of devices for each brewery with any device.

    Responses:
        - 200 OK: If the breweries are successfully retrieved, the response contains a list of all breweries with the number of devices for each brewery.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        breweries = CommercialBrewery.objects.annotate(devices_number=Count('device')).order_by('-devices_number').filter(devices_number__gt=0)
        serializer = BreweryWithDevicesNumberSerializer(breweries, many=True)
        return Response(serializer.data, status=200)


class BreweryListCommercialView(APIView):
    """View for listing all commercial breweries. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of all commercial breweries.

    Responses:
        - 200 OK: If the commercial breweries are successfully retrieved, the response contains a list of all commercial breweries.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        breweries = CommercialBrewery.objects.annotate(devices_number=Count('device')).order_by('-devices_number')
        serializer = BreweryWithDevicesNumberSerializer(breweries, many=True)
        return Response(serializer.data, status=200)


class BreweryListContractView(APIView):
    """View for listing all contract breweries. Class allows only authenticated users to access this view.

    This view supports HTTP methods:
    - GET: Returns a list of all contract breweries.

    Responses:
        - 200 OK: If the contract breweries are successfully retrieved, the response contains a list of all contract breweries.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if not profile.is_intermediary:
            return Response(
                {"error": "Unauthorized to view all contract breweries."},
                status=403
            )

        breweries = ContractBrewery.objects.all()
        serializer = SimpleContractBrewerySerializer(breweries, many=True)
        return Response(serializer.data, status=200)
