# Generated by Django 5.1.5 on 2025-02-06 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0012_remove_topmoviesmodel_movies_moviesmodel_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='moviesmodel',
            name='category',
        ),
        migrations.AddField(
            model_name='moviesmodel',
            name='category',
            field=models.ManyToManyField(null=True, related_name='movies', to='movies.topmoviesmodel'),
        ),
    ]
