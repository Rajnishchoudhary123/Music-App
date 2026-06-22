import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { UserData } from "../Context/user";
import { SongData } from "../Context/song";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

const SongItem = ({ image, name, singer, id, premium }) => {
  const [save, setSave] = useState(false);

  const { addToPlaylist, user } = UserData();
  const { setSelectedSong, setIsPlaying } = SongData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.playlist?.includes(id)) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [user, id]);

  const playSong = () => {
    if (premium && !user?.isPremium) {
      toast.error("Premium Required");
      navigate("/premium");
      return;
    }

    let recentSongs =
      JSON.parse(localStorage.getItem("recentSongs")) || [];

    recentSongs = recentSongs.filter((songId) => songId !== id);
    recentSongs.unshift(id);
    recentSongs = recentSongs.slice(0, 20);

    localStorage.setItem("recentSongs", JSON.stringify(recentSongs));

    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savetoPlaylistHandler = () => {
    setSave(!save);
    addToPlaylist(id);
  };

 return (
  <div className="
    min-w-[180px]
    p-3
    rounded-2xl
    cursor-pointer
    group
    bg-[#0f0f0f]/40
    hover:bg-[#ffffff10]
    transition-all
    duration-300
    hover:scale-[1.03]
    relative
  ">

   
    <div
      className="
        relative
        w-[160px]
        h-[200px]
        overflow-hidden
        rounded-xl
        shadow-lg
      "
      onClick={playSong}
    >

      <img
        src={image}
        className="
          w-full h-full
          object-cover
          group-hover:scale-110
          transition-transform duration-300
        "
        alt=""
      />

     
      <div className="
        absolute inset-0
        bg-black/0
        group-hover:bg-black/30
        transition
      " />

    
      <div className="
        absolute inset-0
        flex items-center justify-center
        opacity-0
        group-hover:opacity-100
        transition
      ">
        <div className="
          bg-green-500
          p-3
          rounded-full
          shadow-lg
          hover:scale-110
          transition
        ">
          ▶
        </div>
      </div>

   
      {premium && (
        <div className="
          absolute top-2 right-2
          bg-yellow-500
          text-black
          text-xs
          px-2 py-1
          rounded-full
          flex items-center gap-1
        ">
          <FaLock className="text-[10px]" />
          Pro
        </div>
      )}

  
      <button
        className="
          absolute bottom-2 left-2
          bg-black/60
          text-white
          p-2
          rounded-full
          opacity-0
          group-hover:opacity-100
          transition
          hover:bg-green-500
        "
        onClick={(e) => {
          e.stopPropagation();
          savetoPlaylistHandler();
        }}
      >
        {save ? <FaBookmark /> : <FaRegBookmark />}
      </button>

    </div>

    
    <div className="mt-3">

      <p className="
        font-semibold text-white truncate w-[150px]
        group-hover:text-green-400
        transition
      ">
        {name}
      </p>

      <p className="text-gray-400 text-xs mt-1">
        {singer}
      </p>

    </div>

  </div>
);
};

export default SongItem;