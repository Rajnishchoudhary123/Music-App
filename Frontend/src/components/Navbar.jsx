import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../Context/user";
import SearchBar from "./SearchBar";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [open, setOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const location = useLocation();
  const { user, logoutUser, cancelPremium, buttonLoading } = UserData();
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
    <>
      <div className="w-full sticky top-0 z-50 rounded-2xl backdrop-blur-xl bg-black/60 border-b border-white/10 px-4 py-3">
      
        <div className="flex justify-between items-center">
         
          <div className="flex items-center gap-3">
            <img
              src={assets.arrow_left}
              className="w-9 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer transition"
              onClick={() => navigate(-1)}
              alt="Back"
            />

            <img
              src={assets.arrow_right}
              className="w-9 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer transition"
              onClick={() => navigate(1)}
              alt="Forward"
            />
          </div>

         
          <div className="hidden md:flex items-center gap-3 bg-[#1a1a1a] px-3 py-2 rounded-full w-[400px]">
            <img
              src={assets.search_icon}
              className="w-5 cursor-pointer opacity-70"
              onClick={() => setShowSearch(!showSearch)}
              alt="Search"
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
              className="px-4 py-1 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition cursor-pointer"
            >
              Dashboard
            </button>

            {!isPremium ? (
              <button
                onClick={() => navigate("/premium")}
                disabled={buttonLoading}
                className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500 text-black text-sm font-medium hover:scale-105 transition disabled:opacity-60 cursor-pointer"
              >
                <FaCrown />
                {buttonLoading ? "Loading..." : "Premium"}
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
                  👑 Premium
                </div>

                <button
                  onClick={() => setShowCancelModal(true)}
                  disabled={buttonLoading}
                  className="px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium hover:scale-105 transition disabled:opacity-60 cursor-pointer"
                >
                  {buttonLoading ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            )}

            <button
              onClick={() => logoutUser(navigate)}
              className="px-4 py-1 rounded-full bg-red-500 text-white text-sm hover:scale-105 transition cursor-pointer"
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
                      onClick={() => logoutUser(navigate)}
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


      {showCancelModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-[#181818] border border-gray-700 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">
                ⚠️
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center">
              Cancel Premium?
            </h2>

            <p className="text-gray-400 text-center mt-3 leading-7">
              Are you sure you want to cancel your Premium subscription?
              <br />
              You'll continue enjoying Premium until the end of your current
              billing period.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition cursor-pointer"
              >
                Keep Premium
              </button>

              <button
                disabled={buttonLoading}
                onClick={async () => {
                  await cancelPremium();
                  setShowCancelModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-60 cursor-pointer"
              >
                {buttonLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;