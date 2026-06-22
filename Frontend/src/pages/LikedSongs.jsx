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
          {!loading && songs.length > 0 && (
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-6
                mt-6
              "
            >
              {songs.map((song) => (
                <div
                  key={song._id}
                  className="hover:scale-[1.03] transition-transform duration-300"
                >
                  <SongItem
                    image={song.thumbnail?.url}
                    name={song.title}
                    singer={song.singer}
                    id={song._id}
                    premium={song.premium}
                  />
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