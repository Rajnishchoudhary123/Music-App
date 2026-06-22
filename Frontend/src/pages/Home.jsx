import React from "react";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../Context/song";
import { FaLock } from "react-icons/fa";

const Home = () => {
  const { songs } = SongData();

  const sections = [
    {
      title: "Today's Biggest Hits",
      songs: songs.filter(
        (song) => song.category === "today-biggest-hits"
      ),
    },
    {
      title: "New Releases",
      songs: songs.filter(
        (song) => song.category === "new-release"
      ),
    },
    {
      title: "Premium Songs",
      songs: songs.filter(
        (song) => song.category === "premium-songs"
      ),
      premium: true,
    },
    {
      title: "Sad Songs",
      songs: songs.filter(
        (song) => song.category === "sad-Songs"
      ),
    },
    {
      title: "Hindi Hits",
      songs: songs.filter(
        (song) => song.category === "hindi-hits"
      ),
    },
    {
      title: "2010s Classics",
      songs: songs.filter(
        (song) => song.category === "2010"
      ),
    },
    {
      title: "Hip-Hop",
      songs: songs.filter(
        (song) => song.category === "hip-hop"
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6">

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900" />

          <div className="relative z-10 p-8 md:p-12">
            <p className="uppercase tracking-widest text-sm text-white/70 mb-2">
              Music For Everyone
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome Back 🎵
            </h1>

            <p className="max-w-xl text-white/80">
              Discover trending hits, premium songs, playlists,
              and your favorite artists all in one place.
            </p>
          </div>
        </div>

        {/* Music Sections */}
        {sections.map((section, index) => (
          <div key={index} className="mb-10">

            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">

                {section.premium && (
                  <div className="bg-yellow-500 p-2 rounded-full">
                    <FaLock className="text-black text-sm" />
                  </div>
                )}

                <h2 className="text-2xl md:text-3xl font-bold">
                  {section.title}
                </h2>
              </div>

              <button className="text-gray-400 hover:text-white transition">
                Show All
              </button>
            </div>

            {/* Songs */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {section.songs.length > 0 ? (
                section.songs.map((song) => (
                  <SongItem
                    key={song._id}
                    image={song.thumbnail?.url}
                    name={song.title}
                    desc={song.description}
                    id={song._id}
                    singer={song.singer}
                    premium={song.premium}
                  />
                ))
              ) : (
                <div className="bg-[#181818] rounded-xl p-6 text-gray-400">
                  No songs found.
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