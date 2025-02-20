'use client'
import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white lg:py-20 md:py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">MovieHub</h2>
            <p className="text-gray-400">Your go-to place for endless entertainment.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">Home</a>
            <a href="#" className="text-gray-400 hover:text-white">Movies</a>
            <a href="#" className="text-gray-400 hover:text-white">About</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6">&copy; 2025 MovieStream. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Footer
