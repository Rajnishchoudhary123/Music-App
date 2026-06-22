import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../Context/user";
import SearchBar from "./SearchBar";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const { logoutUser, user } = UserData();
  const navigate = useNavigate();

  const isPremium = user?.isPremium === true;

  const navItem = (path, label) => (
    <p
      onClick={() => navigate(path)}
      className={`px-4 py-1 rounded-full cursor-pointer text-sm font-medium transition-all duration-200
        ${
          location.pathname === path
            ? "bg-white text-black shadow-md"
            : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
        }`}
    >
      {label}
    </p>
  );

  return (
    <div className="w-full sticky top-0 z-50 rounded-2xl backdrop-blur-xl bg-black/60 border-b border-white/10 px-4 py-3">

     
      <div className="flex justify-between items-center">

   
        <div className="flex items-center gap-3">
          <img
            src={assets.arrow_left}
            className="w-9 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer transition"
            onClick={() => navigate(-1)}
          />

          <img
            src={assets.arrow_right}
            className="w-9 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer transition"
            onClick={() => navigate(1)}
          />
        </div>

        
        <div className="hidden md:flex items-center gap-3 bg-[#1a1a1a] px-3 py-2 rounded-full w-[400px]">
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer opacity-70"
            onClick={() => setShowSearch(!showSearch)}
          />

          {showSearch && (
            <div className="w-full">
              <SearchBar />
            </div>
          )}
        </div>

      
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-1 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition"
          >
            Dashboard
          </button>

        
          {!isPremium ? (
            <button
              onClick={() => navigate("/premium")}
              className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500 text-black text-sm font-medium hover:scale-105 transition"
            >
              <FaCrown />
              Premium
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
              👑 Premium
            </div>
          )}

         
          <button
            onClick={logoutUser}
            className="px-4 py-1 rounded-full bg-red-500 text-white text-sm hover:scale-105 transition"
          >
            Logout
          </button>

          
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-bold cursor-pointer shadow-lg"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    className="text-blue-400 text-sm text-left hover:text-blue-300"
                    onClick={() => navigate("/profile")}
                  >
                    View Profile
                  </button>

                  <button
                    className="text-red-400 text-sm text-left hover:text-red-300"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

     
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">

        {navItem("/", "All")}
        {navItem("/playlist", "Playlist")}
        {navItem("/albums", "Albums")}
        {navItem("/recently-played", "Recently Played")}
        {navItem("/liked", "Liked Songs")}
      </div>

    </div>
  );
};

export default Navbar;