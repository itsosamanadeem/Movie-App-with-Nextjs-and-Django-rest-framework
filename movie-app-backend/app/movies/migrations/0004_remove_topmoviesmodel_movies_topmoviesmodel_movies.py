# Generated by Django 5.1.5 on 2025-02-06 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_alter_topmoviesmodel_category_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topmoviesmodel',
            name='movies',
        ),
        migrations.AddField(
            model_name='topmoviesmodel',
            name='movies',
            field=models.ManyToManyField(to='movies.moviesmodel'),
        ),
    ]
