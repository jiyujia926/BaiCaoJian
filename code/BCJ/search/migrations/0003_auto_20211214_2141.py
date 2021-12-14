# Generated by Django 3.2.9 on 2021-12-14 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0002_auto_20211213_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='herbs',
            name='Chemistry_component',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Detail_page',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='English_name',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Function',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Herb_info',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Medical_function',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Medical_part',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Medical_search',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Name',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Pick_reproduce',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Picture_url',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Plant_pose',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Produce_place',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Subname',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Taboo',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='herbs',
            name='Taste',
            field=models.TextField(null=True),
        ),
    ]
