# Generated by Django 5.1.5 on 2025-02-06 11:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0009_remove_topmoviesmodel_movies_topmoviesmodel_movies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topmoviesmodel',
            name='movies',
        ),
        migrations.AddField(
            model_name='moviesmodel',
            name='movies',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='movies.topmoviesmodel'),
        ),
    ]
