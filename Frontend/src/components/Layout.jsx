import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";
import { FaBars } from "react-icons/fa";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#121212] text-white">
      <div className="h-[90%] flex relative">
        
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}  

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-[9999] transform transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar mobile={true} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full m-2 px-4 sm:px-6 pt-4 pb-28 rounded bg-[#212121] overflow-auto lg:w-[75%] relative z-10">
          
          {/* Mobile top bar */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
            >
              <FaBars />
            </button>
            <p className="font-bold text-lg">Music App</p>
          </div>

          <Navbar />
          {children}
        </div>
      </div>

      <Player />
    </div>
  );
};

export default Layout;