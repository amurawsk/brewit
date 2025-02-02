# Generated by Django 5.1.3 on 2024-12-03 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_commercialbrewery_nip'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='timeslot',
            constraint=models.CheckConstraint(condition=models.Q(('start_timestamp__lte', models.F('end_timestamp'))), name='timeslots_timestamps_direction'),
        ),
    ]
