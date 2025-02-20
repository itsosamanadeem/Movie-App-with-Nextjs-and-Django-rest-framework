"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import WebTorrent from "webtorrent-hybrid";

function MediaPlayer() {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [torrentClient, setTorrentClient] = useState(null);

    useEffect(() => {
        const client = new WebTorrent();
        setTorrentClient(client);

        return () => {
            client.destroy();
        };
    }, []);

    useEffect(() => {
        async function fetchMagnetURI() {
            try {
                const res = await axios.get(`http://127.0.0.1:8001/play?query=${id}`);
                const magnetURI = "magnet:?xt=urn:btih:04bba4e2f593241ac407ca83b2b44f3849039f76&dn=Game+of+Thrones+Season+1+S01+720p+BluRay+x264&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969" // Get magnet link from backend
                
                if (!magnetURI) {
                    console.error("No magnet URI found");
                    return;
                }

                console.log("Magnet URI:", magnetURI);

                startStreaming(magnetURI);
            } catch (error) {
                console.error("Error fetching magnet URI:", error);
            }
        }

        if (torrentClient) {
            fetchMagnetURI();
        }
    }, [id, torrentClient]);

    const startStreaming = (magnetURI) => {
        if (!torrentClient) return;

        torrentClient.add(magnetURI, (torrent) => {
            console.log("Torrent metadata received:", torrent);

            const file = torrent.files.find((file) => file.name.endsWith(".mp4") || file.name.endsWith(".mkv"));

            if (!file) {
                console.error("No playable video file found in torrent");
                return;
            }

            console.log("Streaming:", file.name);

            file.renderTo(videoRef.current, {
                autoplay: true,
                controls: true,
            });
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white md:p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Now Streaming</h2>

            <div className="w-full max-w-4xl">
                <video ref={videoRef} controls autoPlay className="w-full rounded-lg shadow-lg" />
            </div>
        </div>
    );
}

export default MediaPlayer;
