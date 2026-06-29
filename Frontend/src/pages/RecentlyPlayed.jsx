import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../Context/song";
import { FaHistory } from "react-icons/fa";

const RecentlyPlayed = () => {
  const { songs, setSelectedSong, setIsPlaying } = SongData();
  const [recentSongs, setRecentSongs] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recentSongs")) || [];

    const recent = ids
      .map((id) => songs.find((song) => song._id === id))
      .filter(Boolean);

    setRecentSongs(recent);
  }, [songs]);

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaHistory className="text-2xl sm:text-3xl text-green-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Recently Played
            </h1>
          </div>

          <p className="text-gray-400 text-sm sm:text-base">
            Songs you've listened to recently.
          </p>
        </div>

        {recentSongs.length > 0 ? (
          <>
            {/* ===================== Desktop Table ===================== */}
            <div className="hidden md:block bg-[#111] rounded-2xl border border-[#222] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[60px_2fr_1.5fr_80px] px-5 py-3 text-gray-400 text-sm border-b border-[#222]">
                <p>#</p>
                <p>Title</p>
                <p>Singer</p>
                <p className="text-right">Play</p>
              </div>
              {recentSongs.map((song, i) => (
                <div

                  key={song._id}
                  onClick={() => {
                    setSelectedSong(song._id);
                    setIsPlaying(true);
                  }}
                  className="grid grid-cols-[60px_2fr_1.5fr_80px] items-center px-5 py-4 hover:bg-[#1b1b1b] transition cursor-pointer"
                >
                  <p className="text-gray-400">{i + 1}</p>

                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={song.thumbnail?.url}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">
                        {song.title}
                      </p>
                      <p className="text-gray-400 text-sm">Song</p>
                    </div>
                  </div>

                  <p className="text-gray-300 truncate">{song.singer}</p>

                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSong(song._id);
                        setIsPlaying(true);
                      }}
                      className="text-green-400 hover:scale-110 transition text-xl cursor-pointer"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden space-y-3">
              {recentSongs.map((song, i) => (
                <div
                  key={song._id}
                  onClick={() => {
                    setSelectedSong(song._id);
                    setIsPlaying(true);
                  }}
                  className="bg-[#111] border border-[#222] rounded-xl p-3 flex items-center justify-between hover:bg-[#1b1b1b] transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-gray-400 w-5">{i + 1}</span>

                    <img
                      src={song.thumbnail?.url}
                      alt={song.title}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {song.title}
                      </h3>

                      <p className="text-gray-400 text-sm truncate">
                        {song.singer}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSong(song._id);
                      setIsPlaying(true);
                    }}
                    className="ml-3 text-green-400 text-2xl"
                  >
                    ▶
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sm:p-10 text-center">
            <div className="text-5xl sm:text-6xl mb-4">🎵</div>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              No Recently Played Songs
            </h2>

            <p className="text-gray-400 text-sm sm:text-base">
              Start listening to music and your history will appear here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecentlyPlayed;