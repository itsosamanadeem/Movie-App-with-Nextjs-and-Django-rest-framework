'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-700 bg-opacity-50 p-3 rounded-full hover:bg-gray-800 transition hidden lg:flex"
        onClick={onClick}
    >
        <IoMdArrowDropright className="text-3xl text-white" />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-700 bg-opacity-50 p-3 rounded-full hover:bg-gray-800 transition hidden lg:flex"
        onClick={onClick}
    >
        <IoMdArrowDropleft className="text-3xl text-white" />
    </div>
);

function MostPopular() {
    const [categories, setCategories] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [movies, setMovies] = useState([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const API_KEY="e98f042a746873a7d2ce20b4d19bde90"
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
                );
    
                const filteredCategories = res.data.genres.filter((category) =>
                    ["Action", "Comedy", "Horror", "Animation", "Science Fiction"].includes(category.name)
                );
    
                setCategories(filteredCategories);
    
                const moviePromises = filteredCategories.map(async (category) => {
                    const responseMovie = await axios.get(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${category.id}`
                    );
                    return { genreId: category.id, movies: responseMovie.data.results };
                });
    
                const moviesByGenre = await Promise.all(moviePromises);
    
                const movieMap = {};
                moviesByGenre.forEach(({ genreId, movies }) => {
                    movieMap[genreId] = movies;
                });
    
                setMovies(movieMap);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 2 : 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: !isMobile,
        nextArrow: !isMobile && <NextArrow />,
        prevArrow: !isMobile && <PrevArrow />,
    };

    return (
        <div className="w-full bg-gray-900 p-6 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">
                Collections
            </h1>
            <div>
                {categories.slice(0,10).map((category) => (
                    <div key={category.id} className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {category.name}
                        </h2>
                        <Slider {...settings}>
                            {movies[category.id]?.slice(0, 10).map((movie) => (
                                <div
                                    key={movie.id}
                                    className="relative p-2"
                                    onMouseEnter={() => setHoveredMovie(movie.id)}
                                    onMouseLeave={() => setHoveredMovie(null)}
                                >
                                    <img
                                        className="w-full h-[250px] object-cover rounded-lg"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        loading="lazy"
                                    />
                                    {hoveredMovie === movie.id && (
                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end bg-black bg-opacity-80 text-white p-4 rounded-lg transition-opacity duration-300">
                                            <h3 className="text-lg font-bold">{movie.title}</h3>
                                            <p className="text-sm text-gray-300 line-clamp-2">
                                                {movie.overview}
                                            </p>
                                            <Link
                                                href={`/related-movie/${movie.title}`}
                                                className="mt-4 w-full px-3 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition text-center"
                                            >
                                                Watch Now
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostPopular;
