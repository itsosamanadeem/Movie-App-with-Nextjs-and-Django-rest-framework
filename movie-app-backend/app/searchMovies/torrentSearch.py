import requests
from bs4 import BeautifulSoup
import re

class TorrentScraper:
    def __init__(self):
        self.base_url = "https://1337x.to/torrent"
        self.search_url = "https://1337x.to/search/"
        self.headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
        }

    def search(self, query):
        q=query.replace(' ','%20')
        print(q)
        response = requests.get(
            url=f"{self.search_url}{q}/1/", 
            headers=self.headers
        )

        print(f'{self.search_url}{q}/1')
        if response.status_code != 200:
            return {"error": "Failed to fetch results", "status_code": response.status_code}

        soup = BeautifulSoup(response.content, 'html5lib')
        rows = soup.find_all("tr")
        if not rows:
            return {"results": []}  

        results = []
        title_tag=""
        for row in rows:
            td_tag = row.find("td", class_="coll-1 name")
            if td_tag:
                title_tag= td_tag.find("a", class_=False ,href=True)
            seeds = row.find('td', class_="coll-2 seeds")
            leaches = row.find('td', class_="coll-3 leeches")
            date = row.find('td', class_="coll-date")
            size = row.find('td', class_="coll-4 size mob-uploader")

            results.append({
                "url": "https://1337x.to" + title_tag["href"] if title_tag else "N/A",
                "title": title_tag.text if title_tag else "Unknown",
                'seeds': seeds.text if seeds else "Unkown",
                'leaches': leaches.text if leaches else "Unkown",
                'year': date.text if date else "Unknown",
                'size': size.text if size else None
            })

        return {"results": results}



    def direct_search(self, query):
        print(query)
        response =requests.get(url=f"{self.base_url}{query}", headers=self.headers)
        # print(response)
        if response.status_code != 200:
            return {"error": "Failed to fetch results", "status_code": response.status_code}
        
        soup = BeautifulSoup(response.content, 'html5lib')
        magnet_link_tag = soup.find('a', id="openPopup", href=True)

        if not magnet_link_tag:
            return {"message": "No magnet link found"}

        # Extract the magnet URI
        magnet_uri = magnet_link_tag["href"]
        match = re.search(r'btih:([A-Fa-f0-9]+)', magnet_uri)
        # return match.group(1) if match else None

        return {"magnet_uri": match.group(1)}
