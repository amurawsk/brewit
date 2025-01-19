from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CommercialBrewery, ContractBrewery, Device, Profile, TimeSlot, Order
from django.db.models import Count, Sum


class MeasurementField(serializers.Field):
    def to_representation(self, obj):
        return obj.value if obj else None

    def to_internal_value(self, data):
        return data


class CommercialBrewerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialBrewery
        fields = ['name', 'contract_phone_number', 'contract_email', 'description', 'nip', 'address']


class CommercialBreweryInfoSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='contract_email')
    phone_number = serializers.CharField(source="contract_phone_number")

    class Meta:
        model = CommercialBrewery
        fields = [
            'name',
            'email',
            'phone_number',
            'nip',
            'address',
            'description'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        devices = {
            val['device_type']: val['no'] for val in list(
                instance
                .device_set
                .values('device_type')
                .annotate(no=Count('device_type'))
            )
        }
        data['no_devices'] = sum(devices.values())
        data['no_bt'] = devices.get("BT", 0)
        data['no_ft'] = devices.get("FT", 0)
        data['no_ac'] = devices.get("AC", 0)
        data['no_be'] = devices.get("BE", 0)
        orders = {
            val["status"]: val["no"] for val in list(
                Order.objects.filter(
                    timeslot__device__commercial_brewery=instance
                ).distinct()
                .values('status')
                .annotate(no=Count('status', distinct=True))
            )
        }
        data['no_orders'] = sum(orders.values())
        data['no_new'] = orders.get("N", 0)
        data['no_current'] = orders.get("C", 0)
        data['no_past'] = orders.get("P", 0)
        data['no_rejected'] = orders.get("R", 0)
        data["no_employees"] = Profile.objects.filter(
            commercial_brewery=instance
        ).count()
        return data


class CommercialBreweryUpdateSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    phone_number = serializers.CharField()
    nip = serializers.CharField()
    address = serializers.CharField()
    description = serializers.CharField()


class ContractBreweryInfoSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='contract_email')
    ceo = serializers.CharField(source='owner_name')
    phone_number = serializers.CharField(source="contract_phone_number")

    class Meta:
        model = CommercialBrewery
        fields = [
            'name',
            'email',
            'phone_number',
            'ceo',
            'description'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        orders = {
            val["status"]: val["no"] for val in list(
                Order.objects.filter(contract_brewery=instance)
                .values("status")
                .annotate(no=Count('status'))
            )
        }
        data['no_orders'] = sum(orders.values())
        data['no_new'] = orders.get("N", 0)
        data['no_current'] = orders.get("C", 0)
        data['no_past'] = orders.get("P", 0)
        data['no_rejected'] = orders.get("R", 0)
        data['no_employees'] = Profile.objects.filter(
            contract_brewery=instance
        ).count()
        return data


class CommercialAccountInfoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    created_at = serializers.DateTimeField(source="user.date_joined")
    brewery_name = serializers.CharField(source="commercial_brewery.name")
    brewery_nip = serializers.CharField(source="commercial_brewery.nip")
    brewery_address = serializers.CharField(
        source="commercial_brewery.address"
    )
    brewery_description = serializers.CharField(
        source="commercial_brewery.description"
    )

    class Meta:
        model = Profile
        fields = [
            "username",
            "created_at",
            "brewery_name",
            "brewery_nip",
            "brewery_address",
            "brewery_description"
        ]


class ContractAccountInfoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    created_at = serializers.DateTimeField(source="user.date_joined")
    brewery_name = serializers.CharField(source="contract_brewery.name")
    brewery_ceo = serializers.CharField(source="contract_brewery.owner_name")
    brewery_description = serializers.CharField(
        source="contract_brewery.description"
    )

    class Meta:
        model = Profile
        fields = [
            "username",
            "created_at",
            "brewery_name",
            "brewery_ceo",
            "brewery_description"
        ]


class AccountInfoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.pk")
    username = serializers.CharField(source="user.username")
    added_at = serializers.DateTimeField(source="user.date_joined")

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "added_at"
        ]


class CoworkerSerializer(serializers.Serializer):
    coworker_id = serializers.IntegerField()


class AccountCreationSerializer(serializers.Serializer):
    coworker_username = serializers.CharField()
    coworker_password = serializers.CharField()


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
    device = serializers.SerializerMethodField()

    class Meta:
        model = TimeSlot
        fields = ['id', 'status', 'slot_type', 'price', 'start_timestamp', 'end_timestamp', 'device', 'order']

    def get_device(self, obj):
        return {
            "id": obj.device.id,
            "name": obj.device.name,
            "serial_number": obj.device.serial_number
        }

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
    time_slots = TimeSlotSerializer(many=True, source='timeslot_set')
    contract_brewery = ContractBrewerySerializer()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'created_at', 'status', 'beer_type', 'beer_volume', 
            'description', 'rate', 'ended_at', 'contract_brewery',
            'recipe', 'time_slots', 'total_price'
        ]

    def get_total_price(self, obj):
        return obj.timeslot_set.aggregate(sum=Sum("price"))['sum'] or 0
