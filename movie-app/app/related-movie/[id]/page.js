'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation' // Correct useParams for Next.js
import Link from 'next/link'
import axios from 'axios'

function RelatedSearchMovies() {
    const params = useParams();
    const id = params?.id; // Get the movie ID from the route
    const [playmovie, setPlayMovie] = useState([])

    useEffect(() => {
        if (!id) return; // Avoid fetching when id is undefined

        const apiCall = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8001/movies/${id}`);
                const query = res.data.title;

                const torrentSearch = await axios.get(`http://127.0.0.1:8001/search/?query=${query}`);
                console.log('url result', torrentSearch.data);

                setPlayMovie(torrentSearch.data.results || []); // Ensure an array
            } catch (error) {
                console.error(error);
            }
        }
        
        apiCall();
    }, [id]);

    return (
        <div className="w-full bg-gray-900 p-6 mt-10 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-6 mt-3 text-center">
                Related Search
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {playmovie.length > 0 ? (
                    playmovie.map((movie, idx) => {
                        // Extract slug from movie URL
                        const movieSlug = movie.url ? new URL(movie.url).pathname.split("/").pop() : '';

                        return (
                            <Link
                                href={`/play-movie/${movieSlug}`} // Use dynamic slug
                                key={idx}
                                className="flex flex-col bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform"
                            >
                                <img
                                    src={movie.img || 'https://via.placeholder.com/300'}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                                />
                                <div className="mt-2">
                                    <p className="text-white font-semibold">{movie.title}</p>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <p className="text-white text-center col-span-4">
                        Please wait, the search is in progress...
                    </p>
                )}
            </div>
        </div>
    )
}

export default RelatedSearchMovies
