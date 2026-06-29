import React from "react";
import { FaCheckCircle, FaCrown, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] flex items-center justify-center px-4">
      
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
        
        
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

        
        <div className="relative z-10 flex justify-center mb-5">
          <div className="bg-green-500/20 p-5 rounded-full border border-green-400/30 shadow-lg">
            <FaCheckCircle className="text-green-400 text-6xl" />
          </div>
        </div>

        
        <h1 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-3">
          Payment Successful 🎉
        </h1>

        
        <p className="relative z-10 text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          Congratulations! Your premium subscription has been activated successfully.
          Now enjoy unlimited music, premium songs, and an ad-free experience.
        </p>

        
        <div className="relative z-10 flex justify-center mb-8">
          <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-3 rounded-full shadow-lg">
            <FaCrown className="text-lg" />
            <span>Premium Activated</span>
          </div>
        </div>

       
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaMusic className="text-pink-400" />
              <h3 className="font-semibold text-white">Unlimited Music</h3>
            </div>
            <p className="text-sm text-gray-400">
              Access all premium songs and playlists without restrictions.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaCrown className="text-yellow-400" />
              <h3 className="font-semibold text-white">Premium Access</h3>
            </div>
            <p className="text-sm text-gray-400">
              Enjoy exclusive features, better experience, and premium content.
            </p>
          </div>
        </div>


        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go to Home
          </Link>

          <Link
            to="/premium"
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Explore Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;