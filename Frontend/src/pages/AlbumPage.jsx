import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Context/axios";
import SongItem from "../components/SongItem";
import Layout from "../components/Layout";
import { FaMusic } from "react-icons/fa";

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAlbumSongs = async () => {
      const { data } = await axios.get(`/api/songs/album/${id}`);
      setAlbum(data.album);
      setSongs(data.songs);
    };

    fetchAlbumSongs();
  }, [id]);

  return (
  <Layout>
    <div className="p-6 text-white">

      {/* ALBUM HERO */}
      <div className="
        bg-gradient-to-br from-purple-800 via-purple-900 to-black
        rounded-3xl
        p-6 md:p-10
        shadow-2xl
      ">

        <div className="flex flex-col md:flex-row gap-6 md:items-end items-center">

          <img
            src={album?.thumbnail?.url}
            alt={album?.title}
            className="
              w-52 h-52
              md:w-60 md:h-60
              object-cover
              rounded-2xl
              shadow-[0_0_40px_rgba(168,85,247,0.4)]
              hover:scale-105 transition
            "
          />

          <div>

            <p className="uppercase tracking-widest text-sm text-gray-300">
              Album
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-2">
              {album?.title}
            </h1>

            <p className="text-gray-300 mt-3 max-w-2xl leading-relaxed">
              {album?.description}
            </p>

            <div className="flex items-center gap-2 mt-4 text-gray-300 text-sm">
              <FaMusic className="text-purple-400" />
              <span>{songs.length} Songs</span>
            </div>

          </div>

        </div>
      </div>

      {/* SONGS SECTION */}
      <div className="
        mt-8
        bg-[#0f0f0f]/80
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-5 md:p-6
      ">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl md:text-3xl font-bold">
            🎵 Songs in this Album
          </h2>

          <span className="text-gray-400 text-sm">
            {songs.length} tracks
          </span>

        </div>

        {/* GRID */}
        {songs.length > 0 ? (

          <div className="
            grid
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
            gap-5
          ">

            {songs.map((song) => (
              <div
                key={song._id}
                className="
                  hover:scale-[1.05]
                  transition-all
                  duration-300
                  hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
                  rounded-2xl
                "
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
            ))}

          </div>

        ) : (

          <div className="
            text-center
            py-14
            text-gray-400
            bg-[#111]
            rounded-2xl
            border border-white/5
          ">
            <p className="text-lg">No songs found in this album</p>
            <p className="text-sm mt-2 text-gray-500">
              Add songs to start listening 🎧
            </p>
          </div>

        )}

      </div>

    </div>
  </Layout>
);
};

export default AlbumPage;