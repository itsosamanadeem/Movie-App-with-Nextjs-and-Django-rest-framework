'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Link from "next/link"; 

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

const MainSlider = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get("http://127.0.0.1:8001/movies/");
                setMovies(data);
            } catch (err) {
                setError("Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const settings = {
        dots: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: !isMobile, 
        nextArrow: isMobile ? null : <NextArrow />,
        prevArrow: isMobile ? null : <PrevArrow />,
    };

    return (
        <div className="w-full bg-gray-900 text-white">
            {loading ? (
                <div className="h-[500px] flex items-center justify-center text-xl">
                    Loading movies...
                </div>
            ) : error ? (
                <div className="h-[500px] flex items-center justify-center text-red-500 text-xl">
                    {error}
                </div>
            ) : (
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative">
                            <img 
                                className="w-full h-[500px] lg:h-[600px] object-contain object-top md:object-center" 
                                src={movie.poster_url} 
                                alt={movie.title} 
                                loading="lazy"
                            />
                            <div className="absolute bottom-10 left-10 bg-black bg-opacity-60 p-4 rounded-lg">
                                <h2 className="text-4xl font-bold">{movie.title}</h2>
                                <p className="text-lg max-w-lg">{movie.description}</p>
                                <Link 
                                    href={`/play-movie/${movie.title}`}
                                    className="mt-4 px-5 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Watch Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default MainSlider;
