from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Profile
import os


class Command(BaseCommand):
    help = "Creates first admin if there is no users."

    def handle(self, *args, **options):
        if User.objects.filter(is_superuser=True).count() == 0:
            user = User.objects.create_superuser(
                os.environ.get("ADMIN_USERNAME", default="admin"),
                "",
                os.environ.get("ADMIN_PASSWORD", default="admin"),
            )
            Profile.objects.create(
                user=user,
                contract_brewery=None,
                commercial_brewery=None
            )
            print("Created superuser account and its profile.")
        else:
            print("Found superuser!")
