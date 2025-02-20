# Movie Streaming App

A movie streaming web application built with **Next.js** for the frontend and **Django REST Framework** for the backend. This app allows users to search for movies, retrieve magnet links from torrents, and stream movies directly in the browser using **WebTorrent and WebRTC**.

## Features

✅ **Search Movies** – Fetches movie details and magnet links from torrent websites.
✅ **Stream Movies Online** – Uses WebTorrent to stream movies directly in the browser.
✅ **Next.js Frontend** – A fast, SEO-friendly React-based frontend.
✅ **Django REST API** – Manages movie data and user authentication.
✅ **Tailwind CSS** – Styled with modern, responsive UI components.
✅ **Dark Mode** – UI inspired by Stremio with a sleek dark theme.

---

## Tech Stack

### **Frontend:**
- [Next.js](https://nextjs.org/) (React Framework)
- Tailwind CSS
- WebTorrent & WebRTC (for P2P streaming)
- JavaScript (ES6+)

### **Backend:**
- [Django REST Framework](https://www.django-rest-framework.org/)
- Python
- PostgreSQL (Database)
- Docker & Kubernetes (Deployment)

---

## Installation & Setup

### **1. Clone the Repository**
```bash
 git clone https://github.com/itsosamanadeem/Movie-App-with-Nextjs-and-Django-rest-framework.git
 cd Movie-App-with-Nextjs-and-Django-rest-framework
```

### **2. Frontend Setup (Next.js)**
```bash
cd movie-app
npm install  # Install dependencies
npm run dev  # Start the development server
```
Open `http://localhost:3000` in your browser.

### **3. Backend Setup (Django)**
```bash
cd movie-app-backend
python3 -m venv venv   # Create a virtual environment
source venv/bin/activate  # Activate it
pip install -r requirements.txt  # Install dependencies
python manage.py migrate  # Apply database migrations
python manage.py runserver 8001  # Start the Django server on port 8001
```
Backend will be running on `http://127.0.0.1:8001/`. 

---

## Usage

1. Open the frontend app (`http://localhost:3000`).
2. Search for a movie or series.
3. Click on a movie to start streaming.
4. The app fetches magnet links and streams using WebTorrent.

---

## Deployment
### **Docker Setup**
You can containerize the app using Docker.
```bash
# Build and run frontend
cd movie-app
docker build -t movie-app-frontend .
docker run -p 3000:3000 movie-app-frontend

# Build and run backend
cd ../movie-app-backend
docker build -t movie-app-backend .
docker run -p 8000:8000 movie-app-backend
```

---

## Contributing
Contributions are welcome! Feel free to fork the repository and create a pull request with your improvements.

---

## License
This project is licensed under the **MIT License**.

---

## Contact
📧 Email: osamanadeem20@gmail.com  
🐙 GitHub: [@itsosamanadeem](https://github.com/itsosamanadeem)

