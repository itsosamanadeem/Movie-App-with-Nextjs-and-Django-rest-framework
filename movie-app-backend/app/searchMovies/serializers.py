from rest_framework import serializers
from .models import TorrentResult

class TorrentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TorrentResult
        fields = '__all__'  