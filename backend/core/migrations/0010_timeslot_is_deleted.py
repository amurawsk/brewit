# Generated by Django 5.1.4 on 2025-01-15 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_remove_recipe_full_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeslot',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]