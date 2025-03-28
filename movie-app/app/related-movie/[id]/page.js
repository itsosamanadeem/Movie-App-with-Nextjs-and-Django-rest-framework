'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

function RelatedSearchMovies() {
    const params = useParams();
    const id = params?.id;
    const [playmovie, setPlayMovie] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchMovies = async () => {
            try {
                const torrentSearch = await fetch(`/api/scraper/1337x/?query=${id}`);
                let torrentResponse = await torrentSearch.json();

                const movieArray = torrentResponse.results.filter((movie) => {
                    return movie.title !== 'Unknown' &&
                        movie.seeds !== 'Unknown' &&
                        movie.leaches !== 'Unknown' &&
                        movie.size !== 'null' &&
                        movie.url !== 'N/A' &&
                        movie.year !== 'Unknown';
                });

                setPlayMovie(movieArray);
                console.log(movieArray);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [id]);

    const handlePlayMovie = (movie) => {
        router.push(`/play-movie?movie-path=${movie.url.split('/torrent')[1]}`);
    };

    return (
        <div className="w-full bg-gray-900 p-6 mt-10 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-6 mt-3 text-center">
                Related Search
            </h1>

            <div className="overflow-x-auto">
                <table className="lg:table-auto table-fixed w-full border-collapse border border-gray-700 shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white text-left">
                            <th className="border border-gray-700 p-3">Title</th>
                            <th className="border border-gray-700 p-3 text-center hidden md:table-cell">Seeds</th>
                            <th className="border border-gray-700 p-3 text-center hidden md:table-cell">Leeches</th>
                            <th className="border border-gray-700 p-3 text-center hidden lg:table-cell">Date</th>
                            <th className="border border-gray-700 p-3 text-center hidden lg:table-cell">Size</th>
                            <th className="border border-gray-700 p-3 text-center">Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playmovie.length > 0 ? playmovie.map((movie, index) => (
                            <tr key={index} className="text-white hover:bg-gray-800 transition duration-200">
                                <td className="border border-gray-700 p-3">{movie.title}</td>
                                <td className="border border-gray-700 p-3 text-center text-green-400 font-bold hidden md:table-cell">{movie.seeds}</td>
                                <td className="border border-gray-700 p-3 text-center text-red-400 font-bold hidden md:table-cell">{movie.leaches}</td>
                                <td className="border border-gray-700 p-3 text-center hidden lg:table-cell">{movie.year}</td>
                                <td className="border border-gray-700 p-3 text-center text-yellow-400 font-bold hidden lg:table-cell">{movie.size}</td>
                                <td className="border border-gray-700 p-3 text-center">
                                    <button 
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-200"
                                        onClick={() => handlePlayMovie(movie)}
                                    >
                                        Watch
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center text-white p-4">
                                    No Result Found!!!!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RelatedSearchMovies;
