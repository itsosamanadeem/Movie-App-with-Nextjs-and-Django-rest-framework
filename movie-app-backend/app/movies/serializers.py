from rest_framework import serializers
from .models import TopMoviesModel, MoviesModel, GenreTypeModel, GenreMoviesModel

class MoviesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviesModel
        fields = '__all__'

class TopMoviesSerializer(serializers.ModelSerializer):
    movies = serializers.PrimaryKeyRelatedField(
        many=True, queryset=MoviesModel.objects.all(), write_only=True
    )
    movie_details = serializers.SerializerMethodField()

    class Meta:
        model = TopMoviesModel
        fields = ['id', 'category_name', 'movies','movie_details']

    def get_movie_details(self, obj):
        return MoviesModelSerializer(obj.movies.all(), many=True).data

class GenreTypeSerializer(serializers.ModelSerializer):
    movies= serializers.PrimaryKeyRelatedField(many=True, queryset=MoviesModel.objects.all(),
                                               write_only=True                                           
    )
    movies_fetch= serializers.SerializerMethodField()
    class Meta:
        model= GenreTypeModel
        fields=['id','type_of_genre','movies', 'movies_fetch']
    
    def get_movies_fetch(self, obj):
        return MoviesModelSerializer(obj.movies.all(), many=True).data

class GenreMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model= GenreMoviesModel
        fields='__all__'