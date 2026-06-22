import React, { useState } from "react";
import { SongData } from "../Context/song";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchedSongs, setSelectedSong } =
    SongData();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (song) => {
    setSelectedSong(song._id);
    setSearchQuery("");
    setShow(false);
    navigate("/");
  };

 return (
  <div className="relative w-full">

   
    <input
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setShow(true);
      }}
      placeholder="Search songs, artists..."
      className="
        w-full
        p-3
        pl-10
        rounded-full
        bg-[#141414]
        border border-white/10
        text-white
        outline-none
        focus:border-green-500
        focus:ring-2 focus:ring-green-500/20
        transition
      "
    />

    {/* SEARCH ICON (optional visual upgrade) */}
    {/* <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      
    </div> */}

   
    {show && searchQuery.length > 0 && (
      <div className="
        absolute top-14 left-0 w-full
        bg-[#0f0f0f]/95
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-2xl  
        max-h-72
        overflow-y-auto
        z-50
      ">

        {searchedSongs.length > 0 ? (

          searchedSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => handleSelect(song)}
              className="
                flex items-center gap-3
                p-3
                hover:bg-white/10
                cursor-pointer
                transition
                group
              "
            >

              <img
                src={song.thumbnail?.url}
                className="
                  w-11 h-11
                  rounded-md
                  object-cover
                  group-hover:scale-110
                  transition
                "
                alt=""
              />

              <div>
                <p className="text-white text-sm font-medium group-hover:text-green-400">
                  {song.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {song.singer}
                </p>
              </div>

            </div>
          ))

        ) : (

          <div className="p-4 text-center text-gray-400 text-sm">
            No results found 😕
          </div>

        )}

      </div>
    )}

  </div>
);
};

export default SearchBar;