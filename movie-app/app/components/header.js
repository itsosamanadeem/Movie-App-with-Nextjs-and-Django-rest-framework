'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineMenu, MdBackspace, MdOutlineFamilyRestroom } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRandom, FaGoogle, FaFacebook } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import Link from 'next/link';

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef(null);
    const [isMobile, setMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setMobile(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);
    return (
        <>
            {/* Header */}
            <div className="fixed top-0 w-full z-40 flex items-center justify-between p-4 bg-gray-900 text-white">
                {/* Left Section: Menu & Logo */}
                <div className="flex items-center gap-4">
                    <MdOutlineMenu
                        className="lg:text-3xl cursor-pointer text-4xl"
                        onClick={() => setSidebarOpen(true)}
                    />
                    <Link href={'/'}>
                        <Image src="/next.svg" width={80} height={40} alt="Logo" className="bg-white rounded-md" />
                    </Link>
                </div>

                {/* Search Bar */}
                {!isMobile ? (
                    <>
                        {/* Search Icon */}
                        <FiSearch
                            className="text-white font-extrabold text-2xl cursor-pointer"
                            onClick={() => setSearchOpen(!searchOpen)}
                        />
                        
                        {/* Search Bar Below Header (Only When Opened) */}
                        {searchOpen && (
                            <div className="absolute top-full left-0 w-full bg-white p-2 shadow-md flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    className="outline-none border-none flex-1 text-gray-700 bg-transparent px-4 py-2"
                                    ref={searchInputRef}
                                />
                                <FiSearch className="text-gray-500 text-xl cursor-pointer" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-1 max-w-lg bg-white border-2 rounded-lg items-center px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="outline-none border-none flex-1 text-gray-700 bg-transparent"
                        />
                        <FiSearch className="text-gray-500 text-xl cursor-pointer" />
                    </div>
                )}
                
                {/* Right Section: Icons & Login */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4 text-2xl">
                        <MdOutlineFamilyRestroom />
                        <FaRandom />
                        <RiUserCommunityFill />
                    </div>
                    <button
                        className="bg-yellow-500 text-lg lg:py-2 lg:px-5 px-4 py-2 rounded-lg text-white hover:bg-yellow-600 transition"
                        onClick={() => setLoginOpen(true)}
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <>
                    <div
                        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                    <div className="fixed top-0 left-0 h-full w-64 z-40 bg-gray-800 text-white shadow-lg transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b border-gray-600">
                            <h2 className="text-lg font-bold">Menu</h2>
                            <MdBackspace className="text-2xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
                        </div>
                        <ul className="p-4 space-y-3">
                            <li className="font-semibold">Movies</li>
                            <li className="font-semibold">Series</li>
                            <li className="font-semibold">Channels</li>
                            <li className="font-semibold">Anime</li>
                            <hr className="border-gray-600" />
                            <li className="font-semibold">Popular</li>
                            <li>New</li>
                            <li>Featured</li>
                            <li>Top Rated</li>
                            <hr className="border-gray-600" />
                            <li className="font-semibold">Genres</li>
                            <li>Action</li>
                            <li>Adventure</li>
                            <li>Animation</li>
                            <li>Comedy</li>
                            <li>Drama</li>
                            <li>Horror</li>
                            <li>Thriller</li>
                        </ul>
                    </div>
                </>
            )}

            {/* Login Modal */}
            {isLoginOpen && (
                <Modal onClose={() => setLoginOpen(false)}>
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                    <form>
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none" />
                        <button className="w-full py-2 bg-yellow-500 rounded-lg font-bold hover:bg-yellow-600 transition">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <span className="text-yellow-400 cursor-pointer hover:underline" onClick={() => { setSignUpOpen(true); setLoginOpen(false); }}>
                            Sign Up
                        </span>
                    </div>
                    <SocialButtons />
                </Modal>
            )}

            {/* Sign Up Modal */}
            {isSignUpOpen && (
                <Modal onClose={() => setSignUpOpen(false)}>
                    <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                    <form>
                        <input type="text" placeholder="Username" className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none" />
                        <button className="w-full py-2 bg-yellow-500 rounded-lg font-bold hover:bg-yellow-600 transition">
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <span className="text-yellow-400 cursor-pointer hover:underline" onClick={() => { setLoginOpen(true); setSignUpOpen(false); }}>
                            Login
                        </span>
                    </div>
                    <SocialButtons />
                </Modal>
            )}
        </>
    );
};

// Modal Component
const Modal = ({ children, onClose }) => (
    <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-lg bg-gray-800 bg-opacity-90 shadow-lg backdrop-blur-md relative">
                <MdBackspace className="text-2xl cursor-pointer absolute top-4 right-4" onClick={onClose} />
                {children}
            </div>
        </div>
    </>
);

// Social Buttons Component
const SocialButtons = () => (
    <div className="mt-6 flex justify-center space-x-4">
        <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700">
            <FaFacebook size={20} />
        </button>
        <button className="p-2 bg-red-500 rounded-full hover:bg-red-600">
            <FaGoogle size={20} />
        </button>
    </div>
);

export default Header;
