from django.contrib import admin  
from .models import MoviesModel, TopMoviesModel, GenreTypeModel
    
# Register your models here.  
admin.site.register(MoviesModel)
admin.site.register(TopMoviesModel)
# admin.site.register(GenreMoviesModel)
admin.site.register(GenreTypeModel)
