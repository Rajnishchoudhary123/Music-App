import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { FaLock, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { UserData } from "../Context/user";
import { SongData } from "../Context/song";

const SongItem = ({ image, name, singer, id, premium }) => {
  const [save, setSave] = useState(false);
  const [liked, setLiked] = useState(false);

  const { addToPlaylist, user, toggleLikeSong } = UserData();
  const { setSelectedSong, setIsPlaying } = SongData();
  const navigate = useNavigate();


  useEffect(() => {
    if (user?.playlist?.includes(id)) {
      setSave(true);
    } else {
      setSave(false);
    }

    if (user?.likedSongs?.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, id]);

  // Play song
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

  // Like handler
  const handleLike = (e) => {
    e.stopPropagation();
    toggleLikeSong(id);
    setLiked(!liked);
  };

  return (
    <div
      className="
        min-w-[180px]
        p-3
        rounded-2xl
        cursor-pointer
        group
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        hover:bg-white/10
        transition-all
        duration-300
        hover:scale-[1.04]
        hover:shadow-2xl
        relative
      "
    >
      {/* IMAGE */}
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
          alt=""
          className="
            w-full h-full
            object-cover
            group-hover:scale-110
            transition-transform duration-300
          "
        />

        {/* OVERLAY */}
        <div className="
          absolute inset-0
          bg-black/0
          group-hover:bg-black/30
          transition
        " />

        {/* PLAY BUTTON */}
        <div className="
          absolute inset-0
          flex items-center justify-center
          opacity-0
          group-hover:opacity-100
          transition
        ">
          <div className="
            bg-green-500/90
            p-4
            rounded-full
            shadow-xl
            hover:scale-110
            transition
          ">
            ▶
          </div>
        </div>

        {/* TOP RIGHT ACTIONS */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">

          {/* PREMIUM */}
          {premium && (
            <div className="
              bg-yellow-500
              text-black
              text-xs
              px-2 py-1
              rounded-full
              flex items-center gap-1
              shadow-md
            ">
              <FaLock className="text-[10px]" />
              Pro
            </div>
          )}

          {/* LIKE */}
          <button
            onClick={handleLike}
            className="
              bg-black/60
              text-white
              p-2
              rounded-full
              hover:bg-red-500
              transition
              shadow-md
            "
          >
            <FaHeart className={liked ? "text-red-500" : "text-white"} />
          </button>
        </div>

        {/* BOOKMARK */}
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

      {/* TEXT */}
      <div className="mt-3">
        <p
          className="
            font-semibold text-white truncate w-[150px]
            group-hover:text-green-300
            tracking-wide
            transition
          "
        >
          {name}
        </p>

        <p className="text-gray-400 text-xs mt-1 truncate">
          {singer}
        </p>
      </div>
    </div>
  );
};

export default SongItem;