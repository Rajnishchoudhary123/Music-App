import React from "react";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../Context/song";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { songs } = SongData();

  const navigate = useNavigate();

  const sections = [
    {
      title: "Today's Biggest Hits",
      songs: songs.filter((s) => s.category === "today-biggest-hits"),
    },
    {
      title: "New Releases",
      songs: songs.filter((s) => s.category === "new-release"),
    },
    {
      title: "Premium Songs",
      songs: songs.filter((s) => s.category === "premium-songs"),
      premium: true,
    },
    {
      title: "Sad Songs",
      songs: songs.filter((s) => s.category === "sad-Songs"),
    },
    {
      title: "Hindi Hits",
      songs: songs.filter((s) => s.category === "hindi-hits"),
    },
    {
      title: "2010s Classics",
      songs: songs.filter((s) => s.category === "2010"),
    },
    {
      title: "Hip-Hop",
      songs: songs.filter((s) => s.category === "hip-hop"),
    },
  ];

  return (
    <Layout>
      <div className="p-5 md:p-8 text-white space-y-12">

        {/* 🌈 HERO */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">

          {/* animated glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 animate-pulse opacity-80" />

          {/* blur overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          <div className="relative z-10 p-8 md:p-14">

            <p className="uppercase tracking-[4px] text-xs text-white/60 mb-3">
              Music For Everyone
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Welcome Back 🎵
            </h1>

            <p className="max-w-2xl text-white/70 text-sm md:text-base">
              Discover trending hits, premium songs, playlists,
              and your favorite artists all in one place.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="px-5 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition" onClick={() => navigate("/premium")}>
                Explore
              </button>

              <button className="px-5 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition" onClick={() => navigate("/premium")}>
                Premium
              </button>
            </div>
          </div>
        </div>

        {/* 🎵 SECTIONS */}
        {sections.map((section, i) => (
          <div key={i} className="space-y-4">

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {section.premium && (
                  <div className="p-2 rounded-full bg-yellow-400/20 border border-yellow-400/30">
                    <FaLock className="text-yellow-400 text-sm" />
                  </div>
                )}

                <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                  {section.title}
                </h2>
              </div>

              <button className="text-sm text-gray-400 hover:text-white transition">
                View All →
              </button>
            </div>

            {/* CARDS ROW */}
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">

              {section.songs.length > 0 ? (
                section.songs.map((song) => (
                  <div
                    key={song._id}
                    className="hover:scale-[1.03] transition duration-300"
                  >
                    <SongItem
                      image={song.thumbnail?.url}
                      name={song.title}
                      desc={song.description}
                      id={song._id}
                      singer={song.singer}
                      premium={song.premium}
                    />
                  </div>
                ))
              ) : (
                <div className="bg-[#181818] px-5 py-4 rounded-xl text-gray-400">
                  No songs found in this section.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;