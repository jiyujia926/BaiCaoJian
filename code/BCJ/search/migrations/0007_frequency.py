# Generated by Django 3.2.9 on 2021-12-24 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0006_favor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Frequency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=50)),
                ('value', models.IntegerField(default=0)),
            ],
        ),
    ]
