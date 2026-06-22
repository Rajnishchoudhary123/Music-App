import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../Context/song";
import { FaHistory } from "react-icons/fa";

const RecentlyPlayed = () => {
  const { songs, setSelectedSong, setIsPlaying } = SongData();
  const [recentSongs, setRecentSongs] = useState([]);
 
//   useEffect(() => {
//   if (selectedSong) fetchSong();
// }, [selectedSong]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recentSongs")) || [];

    const recent = ids
      .map((id) => songs.find((song) => song._id === id))
      .filter(Boolean);

    setRecentSongs(recent);
  }, [songs]);

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaHistory className="text-3xl text-green-400" />
            <h1 className="text-4xl font-bold">
              Recently Played
            </h1>
          </div>

          <p className="text-gray-400">
            Songs you've listened to recently.
          </p>
        </div>

        {/* Songs */}
       {recentSongs.length > 0 ? (
  <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden">

    {/* HEADER */}
    <div className="grid grid-cols-[50px_1fr_1fr_100px] px-5 py-3 text-gray-400 text-sm border-b border-[#222]">
      <p>#</p>
      <p>Title</p>
      <p>Singer</p>
      <p className="text-right">Action</p>
    </div>

    {/* ROWS */}
    {recentSongs.map((song, i) => (
  <div
    key={song._id}
    className="
      grid grid-cols-[50px_1fr_1fr_100px]
      items-center px-5 py-3
      hover:bg-[#ffffff10]
      transition-all cursor-pointer
    "
    onClick={() => {
      setSelectedSong(song._id);
      setIsPlaying(true);
    }}
  >

    {/* INDEX */}
    <p className="text-gray-400">{i + 1}</p>

    {/* TITLE */}
    <div className="flex items-center gap-3">
      <img
        src={song.thumbnail?.url}
        className="w-10 h-10 rounded object-cover"
        alt=""
      />
      <div>
        <p className="text-white font-medium">{song.title}</p>
        <p className="text-gray-400 text-xs">Song</p>
      </div>
    </div>

    {/* SINGER */}
    <p className="text-gray-300">{song.singer}</p>

    {/* ACTION */}
    <div className="flex justify-end">
      <button
        className="text-green-400 hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedSong(song._id);
          setIsPlaying(true);
        }}
      >
        ▶
      </button>
    </div>

  </div>
))}
  </div>
) : (
          <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">🎵</div>

            <h2 className="text-2xl font-semibold mb-2">
              No Recently Played Songs
            </h2>

            <p className="text-gray-400">
              Start listening to music and your history will appear here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecentlyPlayed;