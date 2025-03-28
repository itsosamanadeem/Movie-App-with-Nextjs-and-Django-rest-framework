from django.db import models
from django.utils.timezone import now

class TorrentResult(models.Model):
    query = models.CharField(max_length=255)  
    title = models.CharField(max_length=500)
    url = models.URLField()
    seeds = models.CharField(max_length=20, null=True, blank=True)
    leeches = models.CharField(max_length=20, null=True, blank=True)
    year = models.CharField(max_length=10, null=True, blank=True)
    size = models.CharField(max_length=50, null=True, blank=True)
    timestamp = models.DateTimeField(default=now)  

    def __str__(self):
        return f"{self.query} - {self.title}"
