# Generated by Django 3.2.9 on 2021-12-26 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0009_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.TextField()),
                ('Url', models.TextField()),
                ('Abstract', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Source', models.TextField()),
                ('Title', models.TextField()),
                ('Info', models.TextField()),
                ('Time', models.TextField()),
                ('Url', models.TextField()),
            ],
        ),
    ]
