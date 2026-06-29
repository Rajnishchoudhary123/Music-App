import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaCrown,
  FaMusic,
  FaHeadphones,
  FaDownload,
  FaBolt,
} from "react-icons/fa";

const Success = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] flex items-center justify-center px-5 py-10">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,.5)] p-8 md:p-12">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,.6)]">
            <FaCheckCircle className="text-white text-6xl" />
          </div>
        </div>

        {/* Equalizer */}
        <div className="flex justify-center gap-1 mt-8 mb-5">
          <div className="w-1 h-6 bg-green-400 rounded animate-pulse"></div>
          <div className="w-1 h-10 bg-green-400 rounded animate-pulse delay-100"></div>
          <div className="w-1 h-7 bg-green-400 rounded animate-pulse delay-200"></div>
          <div className="w-1 h-12 bg-green-400 rounded animate-pulse delay-300"></div>
          <div className="w-1 h-8 bg-green-400 rounded animate-pulse delay-500"></div>
        </div>

        {/* Title */}
        <p className="text-green-300 uppercase tracking-[4px] text-sm text-center">
          THANK YOU FOR SUPPORTING US ❤️
        </p>

        <h1 className="text-center text-4xl md:text-5xl font-bold text-white mt-3">
          Payment Successful 🎉
        </h1>

        <p className="text-center text-gray-300 mt-5 leading-7 max-w-xl mx-auto">
          Your Premium Membership has been activated successfully.
          Enjoy unlimited music streaming, exclusive premium features,
          ad-free listening, and much more.
        </p>

        {/* Premium Badge */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 text-black font-bold shadow-[0_0_40px_rgba(234,179,8,.4)]">
            <FaCrown />
            Premium Membership Active
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6">
          <h2 className="text-white font-semibold text-lg mb-5">
            Payment Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Plan</span>
              <span className="text-white font-semibold">Premium</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 font-semibold">
                Successful
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Access</span>
              <span className="text-white">
                Unlimited
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaMusic className="text-pink-400 text-xl" />
              <h3 className="text-white font-semibold">
                Unlimited Songs
              </h3>
            </div>

            <p className="text-gray-400 text-sm">
              Listen to every song without any restrictions.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaHeadphones className="text-green-400 text-xl" />
              <h3 className="text-white font-semibold">
                Ad-Free Experience
              </h3>
            </div>

            <p className="text-gray-400 text-sm">
              Enjoy uninterrupted music with zero advertisements.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaDownload className="text-blue-400 text-xl" />
              <h3 className="text-white font-semibold">
                Offline Downloads
              </h3>
            </div>

            <p className="text-gray-400 text-sm">
              Download your favorite songs and enjoy them offline.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaBolt className="text-yellow-400 text-xl" />
              <h3 className="text-white font-semibold">
                Exclusive Features
              </h3>
            </div>

            <p className="text-gray-400 text-sm">
              Unlock premium playlists and high-quality audio streaming.
            </p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">

          <Link
            to="/"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-center shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,.5)] transition duration-300"
          >
            🎵 Go to Home
          </Link>

          <Link
            to="/premium"
            className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-center hover:bg-white/20 transition duration-300"
          >
            👑 Premium Benefits
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Success;