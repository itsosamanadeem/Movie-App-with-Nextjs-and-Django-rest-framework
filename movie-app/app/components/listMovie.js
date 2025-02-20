'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; 

function MostPopular() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8001/categories/");
                console.log(res.data);
                setCategories(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="w-full bg-gray-900 p-6 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">
                Collections
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="col-span-1">
                        <h2 className="text-white text-2xl font-bold mb-4">
                            {category.category_name}
                        </h2>
                        {category.movie_details.slice(0, 5).map((movie, idx) => (
                            <Link
                                href={`/related-movie/${idx + 1}`} 
                                key={idx}
                                className="flex my-3 items-center bg-gray-800 p-4 rounded-lg"
                            >
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-24 h-36 object-cover rounded-lg shadow-lg"
                                />
                                <div className="flex flex-col ml-4">
                                    <p className="text-white font-semibold">{movie.title}</p>
                                    <p className="text-gray-400 text-sm">
                                        Duration: {movie.lenght}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        idx: {idx + 1}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        <Link
                            href={`/all-movies/${category.id}`} 
                            className="text-yellow-400 hover:underline mt-2 block text-right"
                        >
                            View All &gt;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostPopular;
