'use client'

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

function TVShows() {
    const [popularShows, setPopularShows] = useState([]);
    const [topRatedShows, setTopRatedShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [hoveredShow, setHoveredShow] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const API_KEY ="e98f042a746873a7d2ce20b4d19bde90"

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const popularRes = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
                const topRatedRes = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
                console.log(topRatedRes);
                
                setPopularShows(popularRes.data.results);
                setTopRatedShows(topRatedRes.data.results);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            }
        };
        fetchShows();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 2 : 5,
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
                TV Shows 🎬
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4">🔥 Popular Shows</h2>
                <Slider {...settings}>
                    {popularShows.slice(0,10).map((show) => (
                        <div 
                            key={show.id} 
                            className="relative p-2"
                            onMouseEnter={() => setHoveredShow(show.id)}
                            onMouseLeave={() => setHoveredShow(null)}
                        >
                            <img
                                className="w-full h-[250px] object-cover rounded-lg"
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                loading="lazy"
                            />
                            {hoveredShow === show.id && (
                                <Link href={`/related-movie/${show.name}`} className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end bg-black bg-opacity-80 text-white p-4 rounded-lg transition-opacity duration-300">
                                    <h3 className="text-lg font-bold">{show.name}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-2">
                                        {show.overview}
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                </Slider>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4">🌟 Top Rated Shows</h2>
                <Slider {...settings}>
                    {topRatedShows.slice(0,10).map((show) => (
                        <div 
                            key={show.id} 
                            className="relative p-2"
                            onMouseEnter={() => setHoveredShow(show.id)}
                            onMouseLeave={() => setHoveredShow(null)}
                        >
                            <img
                                className="w-full h-[250px] object-cover rounded-lg"
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                loading="lazy"
                            />
                            {hoveredShow === show.id && (
                                <Link href={`/related-movie/${show.name}`} className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end bg-black bg-opacity-80 text-white p-4 rounded-lg transition-opacity duration-300">
                                    <h3 className="text-lg font-bold">{show.name}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-2">
                                        {show.overview}
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                </Slider>
            </section>
        </div>
    );
}

export default TVShows;
