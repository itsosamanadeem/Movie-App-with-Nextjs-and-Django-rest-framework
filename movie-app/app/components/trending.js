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
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-950 bg-opacity-50 p-3 rounded-full hover:bg-gray-800 transition"
        onClick={onClick}
    >
        <IoMdArrowDropright className="text-3xl text-white" />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-950 bg-opacity-50 p-3 rounded-full hover:bg-gray-800 transition"
        onClick={onClick}
    >
        <IoMdArrowDropleft className="text-3xl text-white" />
    </div>
);

const Trending = () => {
    const [movies, setMovies] = useState([]);
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
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const settings = {
        dots: isMobile,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 2 }
            }
        ]
    };

    return (
        <div className="w-full bg-gray-900 text-white py-6">
            <h2 className="text-2xl font-bold mb-4 px-6 mt-3">Trending Movies</h2>
            <Slider {...settings}>
                {movies.map((movie,id) => (
                    <Link
                    href={`/related-movie/${id+1}`}
                    key={movie.id} className="px-2 hover:cursor-pointer">
                        <img 
                            className="w-full h-[250px] lg:h-[300px] object-cover rounded-lg shadow-md" 
                            src={movie.poster_url} 
                            alt={movie.title} 
                            loading="lazy"
                        />
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default Trending;
