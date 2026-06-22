import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Context/axios";
import Layout from "../components/Layout";
import { FaMusic, FaPlay } from "react-icons/fa";
import { SongData } from "../Context/song";

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  const { setSelectedSong, setIsPlaying } = SongData();

  useEffect(() => {
    const fetchAlbumSongs = async () => {
      const { data } = await axios.get(`/api/songs/album/${id}`);
      setAlbum(data.album);
      setSongs(data.songs);
    };

    fetchAlbumSongs();
  }, [id]);

  const playSong = (songId) => {
    setSelectedSong(songId);
    setIsPlaying(true);
  };

  return (
    <Layout>
      <div className="p-6 text-white space-y-8">

        {/* HERO */}
        <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black rounded-3xl p-6 md:p-10 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-6 md:items-end items-center">

            <img
              src={album?.thumbnail?.url}
              className="w-52 h-52 md:w-60 md:h-60 object-cover rounded-2xl shadow-xl"
            />

            <div>
              <p className="text-sm text-gray-300 uppercase tracking-widest">
                Album
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mt-2">
                {album?.title}
              </h1>

              <p className="text-gray-300 mt-3 max-w-2xl">
                {album?.description}
              </p>

              <div className="flex items-center gap-2 mt-4 text-gray-300">
                <FaMusic />
                <span>{songs.length} Songs</span>
              </div>
            </div>

          </div>
        </div>

        {/* LIST HEADER */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden">

          <div className="grid grid-cols-[50px_1fr_1fr_80px] px-5 py-3 text-gray-400 text-sm border-b border-white/10">
            <p>#</p>
            <p>Title</p>
            <p>Singer</p>
            <p className="text-right">Play</p>
          </div>

          {/* SONG ROWS */}
          {songs.length > 0 ? (
            songs.map((song, i) => (
              <div
                key={song._id}
                className="grid grid-cols-[50px_1fr_1fr_80px] px-5 py-3 items-center hover:bg-white/5 transition cursor-pointer"
              >

                {/* INDEX */}
                <p className="text-gray-400">{i + 1}</p>

                {/* TITLE */}
                <div className="flex items-center gap-3">
                  <img
                    src={song.thumbnail?.url}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <p className="font-medium">{song.title}</p>
                </div>

                {/* SINGER */}
                <p className="text-gray-400">{song.singer}</p>

                {/* PLAY BUTTON */}
                <div className="flex justify-end">
                  <button
                    onClick={() => playSong(song._id)}
                    className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full transition"
                  >
                    <FaPlay size={12} />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              No songs found in this album
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
};

export default AlbumPage;