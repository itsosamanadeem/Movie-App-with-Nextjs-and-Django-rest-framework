from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import MoviesModel, TopMoviesModel, GenreTypeModel,GenreMoviesModel
from .serializers import MoviesModelSerializer, TopMoviesSerializer,GenreTypeSerializer
from rest_framework.response import Response
from .models import GenreTypeModel, GenreMoviesModel
from .serializers import MoviesModelSerializer
from rest_framework.views import APIView


class MoviesModelViewSet(viewsets.ModelViewSet):
    queryset = MoviesModel.objects.all()
    serializer_class = MoviesModelSerializer
    
class TopMoviesViewSet(viewsets.ModelViewSet):
    queryset = TopMoviesModel.objects.all()
    serializer_class = TopMoviesSerializer

class GenreTypeViewset(viewsets.ModelViewSet):
    queryset= GenreTypeModel.objects.all()
    serializer_class= GenreTypeSerializer

class MoviesByGenreView(APIView):
    def get(self, request, *args, **kwargs):
        genres = GenreTypeModel.objects.all()
        genre_dict = {}

        for genre in genres:
            # Fetch GenreMoviesModel instances related to the genre
            genre_movies = GenreMoviesModel.objects.filter(genre_type=genre)

            # Fetch associated movies
            movies = [movie for gm in genre_movies for movie in gm.genre_type.movies.all()]
            serialized_movies = MoviesModelSerializer(movies, many=True).data
            genre_dict[genre.type_of_genre] = serialized_movies

        return Response({"genres": genre_dict}, status=status.HTTP_200_OK)