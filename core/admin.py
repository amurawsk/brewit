from django.contrib import admin
from .models import (
    CommercialBrewery,
    ContractBrewery,
    Profile,
    TimeSlot,
    Device,
    Order,
    Recipe,
    Stage
)

# Register your models here.
admin.site.register(CommercialBrewery)
admin.site.register(ContractBrewery)
admin.site.register(Profile)
admin.site.register(TimeSlot)
admin.site.register(Device)
admin.site.register(Order)
admin.site.register(Recipe)
admin.site.register(Stage)
