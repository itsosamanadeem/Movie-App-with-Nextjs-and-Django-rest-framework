'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; 
import Link from "next/link";

function AllMovies() {
  const params = useParams();
  const id = params?.id; 
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategoryMovies = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8001/categories/${id}/`);
        setCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchCategoryMovies();
  }, [id]);

  if (!id || !category) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="w-full bg-gray-900 p-6 mt-10 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        {category.category_name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.movie_details.map((movie, idx) => (
          <Link
            href={`/related-movie/${idx + 1}`}
            key={idx}
            className="flex flex-col bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform"
          >
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-2">
              <p className="text-white font-semibold">{movie.title}</p>
              <p className="text-gray-400 text-sm">Duration: {movie.length}</p>
              <p className="text-gray-400 text-sm">IMDb Rating: {movie.imdb_rating}</p>
              <p className="text-gray-400 text-sm">Index: {idx + 1}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllMovies;
