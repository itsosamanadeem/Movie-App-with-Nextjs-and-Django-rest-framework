from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TorrentSearchView, TorrentSearchPlayView

router = DefaultRouter()
router.register(r"search", TorrentSearchView, basename="torrent-search")
router.register(r"play", TorrentSearchPlayView, basename="torrent-movie")

urlpatterns = [
    path("", include(router.urls)),  # Include ViewSet routes
]
