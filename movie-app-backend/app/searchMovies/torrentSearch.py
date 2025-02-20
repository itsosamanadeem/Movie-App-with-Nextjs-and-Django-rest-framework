import requests
from bs4 import BeautifulSoup

class TorrentScraper:
    def __init__(self):
        self.base_url = "https://yts.mx/movies"
        self.search_url = "https://yts.mx/browse-movies"
        self.headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
        }

    def search(self, query):
        response = requests.get(
            url=f"{self.search_url}/{query}/all/all/0/latest/0/all", 
            headers=self.headers
        )

        if response.status_code != 200:
            return {"error": "Failed to fetch results", "status_code": response.status_code}

        soup = BeautifulSoup(response.content, 'html5lib')
        movie_divs = soup.find_all('div', class_='browse-movie-wrap')

        if not movie_divs:
            return {"message": "No results found"}

        results = []
        for movie in movie_divs:
            title = movie.find('a', class_='browse-movie-title')
            image= movie.find('img',class_='img-responsive')
            year = movie.find('div', class_='browse-movie-year')
            link = title['href'] if title else None

            results.append({
                "title": title.text if title else "N/A",
                "year": year.text if year else "N/A",
                "url": link if link else "N/A",
                'img': image['src'] if image else None
            })

        return {"results": results}



    def direct_search(self, query):

        response =requests.get(url=f"{self.base_url}/{query}", headers=self.headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch results", "status_code": response.status_code}
        soup = BeautifulSoup(response.content, 'html5lib')
        movie_divs = soup.find_all('div', class_='modal-torrent')

        if not movie_divs:
            return {"message": "No results found"}

        results = []
        for movie in movie_divs:
            magnet_url = movie.find('a', class_='magnet-download download-torrent magnet')
            link = magnet_url['href'] if magnet_url else None

            results.append({
                'link': link
            })

        # results= query.
        return {"results": results}
