from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoviesModelViewSet, TopMoviesViewSet,GenreTypeViewset
from .views import MoviesByGenreView

router = DefaultRouter()
router.register(r'movies', MoviesModelViewSet)
router.register(r'categories', TopMoviesViewSet)
router.register(r'genre', GenreTypeViewset)
# router.register(r'genre-movies', MoviesByGenreView, basename='movies-by-genre')

urlpatterns = [
    path('', include(router.urls)),
    path('movies-genre/', MoviesByGenreView.as_view(), name='movies-by-genre')
    # path('genre/', MoviesByGenreView.as_view(), name='movies-by-genre'),
]

