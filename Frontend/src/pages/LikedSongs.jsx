import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { UserData } from "../Context/user";
import { FaHeartBroken } from "react-icons/fa";

const LikedSongs = () => {
  const { getLikedSongs } = UserData();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLikedSongs();
        setSongs(data || []);
      } catch (err) {
        console.log(err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen relative p-6 text-white bg-black overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10">

          {/* HEADER CARD */}
          <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              ❤️ Liked Songs
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Your favorite tracks collected in one place
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="p-6 text-gray-400 animate-pulse">
              Loading your liked songs...
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && songs.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20">
              <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                <FaHeartBroken className="text-6xl mb-4 text-red-500 mx-auto" />
                <p className="text-xl font-semibold">
                  No liked songs yet
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Start liking songs to build your collection ❤️
                </p>
              </div>
            </div>
          )}

          {/* SONG GRID (NEW SPOTIFY STYLE GRID) */}
         {/* SONG LIST */}
{!loading && songs.length > 0 && (
  <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">

    {/* Desktop Header */}
    <div className="hidden md:grid grid-cols-[60px_1fr_1fr_80px] px-5 py-3 border-b border-white/10 text-gray-400 text-sm">
      <p>#</p>
      <p>Title</p>
      <p>Singer</p>
      <p className="text-right">Play</p>
    </div>

    {songs.map((song, i) => (
      <div
        key={song._id}
        onClick={() => {
          song.clickHandler?.();
        }}
        className="
          flex md:grid
          md:grid-cols-[60px_1fr_1fr_80px]
          items-center
          gap-4
          px-4 md:px-5
          py-3
          border-b border-white/10
          hover:bg-white/5
          transition
          group
          cursor-pointer
        "
      >
        {/* Index */}
        <div className="hidden md:block text-gray-400">
          {i + 1}
        </div>

        {/* Song */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          <img
            src={song.thumbnail?.url}
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />

          <div className="min-w-0">

            <h3 className="font-semibold truncate group-hover:text-green-400 transition">
              {song.title}
            </h3>

            <p className="text-sm text-gray-400 truncate">
              {song.singer}
            </p>

          </div>

        </div>

        {/* Desktop Singer */}
        <p className="hidden md:block text-gray-300 truncate">
          {song.singer}
        </p>

        {/* Play Button */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              song.clickHandler?.();
            }}
            className="
              w-10
              h-10
              rounded-full
              bg-green-500
              hover:bg-green-400
              flex
              items-center
              justify-center
              opacity-100 md:opacity-0
              md:group-hover:opacity-100
              transition
            "
          >
            ▶
          </button>
        </div>

      </div>
    ))}
  </div>
)}

        </div>
      </div>
    </Layout>
  );
};

export default LikedSongs;