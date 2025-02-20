from django.contrib import admin
from django.urls import path, include
# from ..movies import urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('movies.urls')),
    # path('', include('popularmovies.urls')),
    path('', include('searchMovies.urls'))
]
