from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
import asyncio

from .torrentSearch import TorrentScraper  # Ensure correct import

class TorrentSearchView(ViewSet):

    def list(self, request):
        query = request.GET.get("query")
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        scraper = TorrentScraper()
        result = scraper.search(query)
        return Response(result, status=status.HTTP_200_OK)
    
class TorrentSearchPlayView(ViewSet):

    # def lis()
    def list(self, request):
        query = request.GET.get("query")
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        scraper = TorrentScraper()
        result = scraper.direct_search(query)
        return Response(result, status=status.HTTP_200_OK)