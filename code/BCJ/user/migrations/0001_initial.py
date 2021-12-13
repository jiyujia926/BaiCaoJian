# Generated by Django 3.2.9 on 2021-12-13 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('UID', models.UUIDField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=10)),
                ('Password', models.CharField(max_length=20)),
                ('Email', models.EmailField(max_length=30)),
                ('Github', models.CharField(max_length=30)),
            ],
        ),
    ]
