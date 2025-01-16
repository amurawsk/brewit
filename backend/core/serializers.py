from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CommercialBrewery, CommercialBrewery, ContractBrewery, Device, Order, Profile, TimeSlot


class MeasurementField(serializers.Field):
    def to_representation(self, obj):
        return obj.value if obj else None

    def to_internal_value(self, data):
        return data


class CommercialBrewerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialBrewery
        fields = ['name', 'contract_phone_number', 'contract_email', 'description', 'nip', 'address']


class ContractBrewerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractBrewery
        fields = ['name', 'contract_phone_number', 'contract_email', 'description', 'owner_name']


class RegisterCommercialSerializer(serializers.ModelSerializer):
    commercial_brewery = serializers.DictField()

    class Meta:
        model = User
        fields = ['username', 'password', 'commercial_brewery']

    def create(self, validated_data):
        commercial_brewery_data = validated_data.pop('commercial_brewery')

        if CommercialBrewery.objects.filter(nip=commercial_brewery_data['nip']).exists():
            raise serializers.ValidationError({"nip": "This NIP is already taken."})

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        commercial_brewery = CommercialBrewery.objects.create(
            name=commercial_brewery_data['name'],
            contract_phone_number=commercial_brewery_data['contract_phone_number'],
            contract_email=commercial_brewery_data['contract_email'],
            description=commercial_brewery_data['description'],
            nip=commercial_brewery_data['nip'],
            address=commercial_brewery_data['address']
        )

        Profile.objects.create(user=user, commercial_brewery=commercial_brewery)

        return user


class RegisterContractSerializer(serializers.ModelSerializer):
    contract_brewery = ContractBrewerySerializer()

    class Meta:
        model = User
        fields = ['username', 'password', 'contract_brewery']

    def create(self, validated_data):
        contract_brewery_data = validated_data.pop('contract_brewery')

        if ContractBrewery.objects.filter(owner_name=contract_brewery_data['owner_name']).exists():
            raise serializers.ValidationError({"owner_name": "This owner name is already registered."})

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        contract_brewery = ContractBrewery.objects.create(
            name=contract_brewery_data['name'],
            contract_phone_number=contract_brewery_data['contract_phone_number'],
            contract_email=contract_brewery_data['contract_email'],
            description=contract_brewery_data['description'],
            owner_name=contract_brewery_data['owner_name']
        )

        Profile.objects.create(user=user, contract_brewery=contract_brewery)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise serializers.ValidationError("User profile not found.")
        user_type = None
        if profile.commercial_brewery:
            user_type = "commercial_brewery"
            user_id = profile.id
            brewery_id = profile.commercial_brewery.id
        elif profile.contract_brewery:
            user_type = "contract_brewery"
            user_id = profile.id
            brewery_id = profile.contract_brewery.id

        return {
            "user": user,
            "user_type": user_type,
            "user_id": user_id,
            "brewery_id": brewery_id
        }


class CheckUsernameUniqueSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value


class DeviceSerializer(serializers.ModelSerializer):
    capacity = MeasurementField()
    temperature_min = MeasurementField()
    temperature_max = MeasurementField()

    class Meta:
        model = Device
        fields = [
            'id', 'name', 'device_type', 'serial_number', 'capacity',
            'temperature_min', 'temperature_max', 'sour_beers',
            'carbonation', 'supported_containers', 'commercial_brewery'
        ]


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'status', 'slot_type', 'price', 'start_timestamp', 'end_timestamp', 'device', 'order']

    def validate(self, data):
        if data['start_timestamp'] >= data['end_timestamp']:
            raise serializers.ValidationError("Start time must be before end time.")
        return data


class TimeSlotEditPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['price']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value


class DeviceWithTimeSlotsSerializer(serializers.ModelSerializer):
    timeSlots = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = ['id', 'name', 'device_type', 'timeSlots']

    def get_timeSlots(self, obj):
        time_slots = obj.timeslot_set.filter(is_deleted=False)
        return TimeSlotSerializer(time_slots, many=True).data


class OrderSerializer(serializers.ModelSerializer):
    beer_volume = MeasurementField()

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'status', 'beer_type', 'beer_volume', 'description', 'rate', 'ended_at', 'contract_brewery', 'recipe']


class OrderWithTimeSlotsSerializer(serializers.ModelSerializer):
    beer_volume = MeasurementField()
    timeSlots = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'status', 'beer_type', 'beer_volume', 'description', 'rate', 'ended_at', 'contract_brewery', 'recipe', 'timeSlots']

    def get_timeSlots(self, obj):
        time_slots = obj.timeslot_set.filter(is_deleted=False)
        return TimeSlotSerializer(time_slots, many=True).data
