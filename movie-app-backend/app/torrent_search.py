import aiohttp
import asyncio
import subprocess
from bs4 import BeautifulSoup
import re
from difflib import SequenceMatcher  # For string similarity matching

class TorrentScraper:
    def __init__(self):
        self.base_url = "https://www.1377x.to"  # 1337x proxy URL (update if needed)
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.max_pages = 10  # Fetch results from 10 pages

    async def fetch(self, session, url):
        """Fetch page content asynchronously."""
        async with session.get(url, headers=self.headers) as response:
            return await response.text() if response.status == 200 else None

    async def search_movie_anime_or_series(self, query):
        """Search for movies, anime, and TV series across multiple pages, filtering by relevance."""
        torrents = []

        async with aiohttp.ClientSession() as session:
            tasks = []
            for page in range(1, self.max_pages + 1):
                movie_url = f"{self.base_url}/search/{query}/{page}/"
                anime_url = f"{self.base_url}/category-search/{query}/Anime/{page}/"
                series_url = f"{self.base_url}/category-search/{query}/TV/{page}/"

                tasks.extend([self.fetch(session, movie_url), self.fetch(session, anime_url), self.fetch(session, series_url)])

            pages = await asyncio.gather(*tasks)

            for page_content in pages:
                if page_content:
                    torrents.extend(self.parse_results(page_content, query))

        return self.sort_tv_series(torrents)

    def parse_results(self, page_content, query):
        """Parse torrent search results and return a filtered list of relevant links."""
        soup = BeautifulSoup(page_content, "html.parser")
        results = [{"title": a.text, "link": a.get("href")} for a in soup.select("td.name a:nth-of-type(2)")]

        # Filter and sort results based on similarity to the query
        results = sorted(results, key=lambda x: self.similarity(query, x["title"]), reverse=True)

        # Keep only top 15 most relevant results
        return results[:15]

    def similarity(self, query, title):
        """Calculate similarity between query and title using SequenceMatcher."""
        return SequenceMatcher(None, query.lower(), title.lower()).ratio()

    def sort_tv_series(self, series_results):
        """Sort TV series episodes in sequential order."""
        def extract_episode_info(title):
            """Extracts season & episode number from a title (e.g., S01E02)."""
            match = re.search(r"(S\d{2}E\d{2})", title, re.IGNORECASE)
            return match.group(0) if match else title

        return sorted(series_results, key=lambda x: extract_episode_info(x["title"]))

    async def get_magnet_link(self, session, relative_url):
        """Extract the magnet link from a torrent page."""
        page_url = f"{self.base_url}{relative_url}"
        page_content = await self.fetch(session, page_url)

        if not page_content:
            return None

        soup = BeautifulSoup(page_content, "html.parser")
        magnet_link = soup.select_one("a[href^='magnet:']")
        return magnet_link["href"] if magnet_link else None

    def play_with_vlc(self, magnet_link):
        """Stream torrent using VLC via WebTorrent."""
        try:
            subprocess.run(["webtorrent", magnet_link, "--vlc"], check=True)
        except FileNotFoundError:
            print("WebTorrent is not installed. Install it with: npm install -g webtorrent-cli")
        except subprocess.CalledProcessError:
            print("Error starting WebTorrent. Make sure it's installed correctly.")

async def main():
    scraper = TorrentScraper()
    query = input("Enter movie, anime, or TV series name: ")
    torrents = await scraper.search_movie_anime_or_series(query)

    if not torrents:
        print("No torrents found.")
        return

    async with aiohttp.ClientSession() as session:
        tasks = [scraper.get_magnet_link(session, torrent["link"]) for torrent in torrents]
        magnet_links = await asyncio.gather(*tasks)

    torrents = [{"title": t["title"], "magnet": m} for t, m in zip(torrents, magnet_links) if m]

    print("\nFound Torrents (Most Relevant First):")
    for idx, torrent in enumerate(torrents, start=1):
        print(f"{idx}. {torrent['title']}")

    try:
        choice = int(input("\nEnter the number of the torrent to stream: ")) - 1
        if 0 <= choice < len(torrents):
            selected_magnet = torrents[choice]["magnet"]
            print("\nStarting stream in VLC...\n")
            scraper.play_with_vlc(selected_magnet)
        else:
            print("Invalid selection.")
    except ValueError:
        print("Please enter a valid number.")

if __name__ == "__main__":
    asyncio.run(main())
