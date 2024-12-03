from django.contrib import admin
from .models import (
    CommercialBrewery,
    ContractBrewery,
    Profile
)

# Register your models here.
admin.site.register(CommercialBrewery)
admin.site.register(ContractBrewery)
admin.site.register(Profile)
