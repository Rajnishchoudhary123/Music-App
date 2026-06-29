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
      <div className="p-4 md:p-6 text-white space-y-8">

        
        <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black rounded-3xl p-5 md:p-10 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">

            <img
              src={album?.thumbnail?.url}
              alt={album?.title}
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl object-cover shadow-xl"
            />

            <div className="text-center md:text-left">

              <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-widest">
                Album
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mt-2">
                {album?.title}
              </h1>

              <p className="text-gray-300 mt-3 max-w-2xl text-sm sm:text-base">
                {album?.description}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-gray-300">
                <FaMusic />
                <span>{songs.length} Songs</span>
              </div>

            </div>
          </div>
        </div>

       
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden">

          
          <div className="hidden md:grid grid-cols-[50px_1fr_1fr_80px] px-5 py-3 text-gray-400 text-sm border-b border-white/10">
            <p>#</p>
            <p>Title</p>
            <p>Singer</p>
            <p className="text-right">Play</p>
          </div>

          {songs.length > 0 ? (
            songs.map((song, i) => (
              <div
                key={song._id}
                onClick={() => playSong(song._id)}
                className="
                  flex md:grid
                  md:grid-cols-[50px_1fr_1fr_80px]
                  items-center
                  px-4 md:px-5
                  py-3
                  border-b border-white/10
                  hover:bg-white/5
                  transition
                  cursor-pointer
                "
              >
             
                <div className="hidden md:block text-gray-400">
                  {i + 1}
                </div>

                
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={song.thumbnail?.url}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {song.title}
                    </p>

                 
                    <p className="md:hidden text-gray-400 text-sm truncate">
                      {song.singer}
                    </p>
                  </div>
                </div>

                
                <p className="hidden md:block text-gray-400 truncate">
                  {song.singer}
                </p>

                
                <div className="ml-3 md:ml-0 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSong(song._id);
                    }}
                    className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full transition cursor-pointer"
                  >
                    <FaPlay size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 md:p-10 text-center text-gray-400">
              No songs found in this album
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
};

export default AlbumPage;