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
      <div className="min-h-screen p-6 text-white bg-gradient-to-b from-[#0a0a0a] via-[#111] to-black">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            ❤️ Liked Songs
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Your favorite tracks collected in one place
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-gray-400 animate-pulse">
            Loading your liked songs...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && songs.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <FaHeartBroken className="text-5xl mb-4 text-red-500" />
            <p className="text-lg font-medium">No liked songs yet</p>
            <p className="text-sm mt-1">
              Start liking songs to see them here ❤️
            </p>
          </div>
        )}

        {/* SONG GRID */}
        {!loading && songs.length > 0 && (
          <div
            className="
              flex flex-wrap
              gap-5
              justify-start
              mt-6
            "
          >
            {songs.map((song) => (
              <SongItem
                key={song._id}
                image={song.thumbnail?.url}
                name={song.title}
                singer={song.singer}
                id={song._id}
                premium={song.premium}
              />
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default LikedSongs;