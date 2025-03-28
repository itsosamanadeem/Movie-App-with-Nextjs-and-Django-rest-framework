"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function MediaPlayer() {
    const searchParams = useSearchParams();
    const moviePath = searchParams.get("movie-path");
    const [videoStream, setVideoStream] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!moviePath) return;

        async function fetchVideoStream() {
            try {
                const play_movie_api = await fetch(`/api/torrent/?movie-path=${moviePath}`);
                const play_movie_json= await play_movie_api.json()

                console.log(play_movie_json);
                setVideoStream(play_movie_json)
                
            } catch (error) {
                console.error("Error fetching video stream:", error);
                setVideoStream(null);
            } finally {
                setLoading(false);
            }
        }

        fetchVideoStream();
    }, [moviePath]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white md:p-6">
            {loading ? (
                <>
                    <h2 className="text-3xl font-bold mb-4 text-center">Fetching Stream...</h2>
                    <p className="text-center">Please wait while we fetch the stream...</p>
                </>
            ) : videoStream ? (
                <video src={videoStream} controls autoPlay className="w-full max-w-4xl"></video>
            ) : (
                <p className="text-red-500 text-center">Failed to load the video. Please try again.</p>
            )}
        </div>
    );
}

export default MediaPlayer;
