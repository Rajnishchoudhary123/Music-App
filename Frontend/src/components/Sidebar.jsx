import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../Context/user";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ mobile = false, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = UserData();

  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleMenuClick = () => {
    if (mobile) {
      closeSidebar?.(); // mobile me sidebar band
    } else {
      setCollapsed(!collapsed); // desktop me collapse
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (mobile) closeSidebar?.(); // mobile me click ke baad sidebar band
  };

  return (
    <div
      className={`h-full flex flex-col gap-2 text-white p-2 transition-all duration-300 bg-[#121212]
      ${mobile ? "w-[280px]" : collapsed ? "w-[80px]" : "w-[25vw] min-w-[240px]"}`}
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-2">
        {!collapsed && <p className="text-lg font-bold px-2">Menu</p>}

        <button
          onClick={handleMenuClick}
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Home */}
      <div className="bg-[#121212]/80 backdrop-blur-xl rounded-2xl p-2">
        <div
          onClick={() => handleNavigate("/")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
            isActive("/") ? "bg-white text-black" : "hover:bg-white/10"
          }`}
        >
          <img src={assets.home_icon} className="w-6" alt="" />
          {!collapsed && <p className="font-semibold">Home</p>}
        </div>
      </div>

      {/* Library */}
      <div className="flex-1 bg-[#121212]/80 backdrop-blur-xl rounded-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} className="w-6" alt="" />
            {!collapsed && <p className="font-semibold">Library</p>}
          </div>

          {!collapsed && (
            <div className="flex items-center gap-2">
              <img
                src={assets.arrow_icon}
                className="w-7 p-1 rounded-full hover:bg-white/10 cursor-pointer"
                alt=""
              />
              <img
                src={assets.plus_icon}
                className="w-7 p-1 rounded-full hover:bg-white/10 cursor-pointer"
                alt=""
              />
            </div>
          )}
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          <div
            onClick={() => handleNavigate("/liked")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition mb-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-md flex items-center justify-center">
              ❤️
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Liked Songs</p>
                <p className="text-xs text-gray-400">Your favorites</p>
              </div>
            )}
          </div>

          <div
            onClick={() => handleNavigate("/recently-played")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition mb-3"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center">
              ⏱
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Recently Played</p>
                <p className="text-xs text-gray-400">Your history</p>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              handleNavigate("/playlist");
            }}
            className="hover:scale-[1.02] transition mb-3"
          >
            <PlayListCard collapsed={collapsed} />
          </div>

          {user?.role === "admin" && (
            <button
              onClick={() => handleNavigate("/admin")}
              className={`mt-4 w-full py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-semibold hover:scale-[1.03] transition ${
                collapsed ? "text-xs px-1" : ""
              }`}
            >
              {collapsed ? "A" : "Admin Dashboard"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;