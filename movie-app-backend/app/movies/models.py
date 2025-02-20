from django.db import models

class MoviesModel(models.Model):
    title = models.CharField(max_length=100)
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    description = models.TextField()
    length = models.CharField(max_length=100)  
    genre = models.CharField(max_length=100)
    poster_url = models.URLField()

    def __str__(self):
        return self.title

class TopMoviesModel(models.Model):
    category_name = models.CharField(max_length=50)
    movies = models.ManyToManyField(MoviesModel, related_name="top_movies")  

    def __str__(self):
        return self.category_name

class GenreTypeModel(models.Model):
    type_of_genre= models.CharField(max_length=100)
    movies= models.ManyToManyField(MoviesModel, related_name="movie_types")
    def __str__(self):
        return self.type_of_genre

class GenreMoviesModel(models.Model):
    genre_type= models.ForeignKey(GenreTypeModel, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.genre_type.movies
