import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../Context/song'
import { assets } from '../assets/assets';
import { FaBookmark, FaPlay } from 'react-icons/fa';
import { UserData } from '../Context/user';
import { useNavigate } from 'react-router-dom';


const PlayList = ({user}) => {

  const {songs , setSelectedSong ,setIsPlaying} = SongData();

  const [myPlaylist , setMyPlaylist] = useState([]);

  const {addToPlaylist }= UserData();
  
  const navigate = useNavigate()

  useEffect(()=>{

    if(songs  && user && Array.isArray(user.playlist)){

      const filteredSongs = songs.filter((song)=>
        
        user.playlist.includes(song._id.toString())
      )
        setMyPlaylist(filteredSongs) 
    } 
  },[songs , user])


  const onclickHander = (song) => {
  if (song.premium && !user?.isPremium) {
    toast.error("Premium Required");
    navigate("/premium");
    return;
  }

  setSelectedSong(song._id);
  setIsPlaying(true);
};

  const savePlayListHandler = (id)=>{

    addToPlaylist(id);

  };


  return (
  <Layout>
    <div className="p-4 md:p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">

  <img
    src={
      myPlaylist.length
        ? myPlaylist[0].thumbnail.url
        : "https://via.placeholder.com/250"
    }
    alt=""
    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl"
  />

  <div className="text-center md:text-left">

    <p className="uppercase tracking-[3px] text-xs sm:text-sm text-gray-400">
      Playlist
    </p>

    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mt-2">
      {user?.name}'s Playlist
    </h1>

    <p className="text-gray-400 mt-3 text-sm sm:text-base">
      Your favourite songs collection 🎧
    </p>

    <div className="flex justify-center md:justify-start gap-2 mt-4 text-gray-300">
      <span>{myPlaylist.length} Songs</span>
    </div>

  </div>

</div>

      {/* LIST HEADER */}
      <div className="hidden md:grid grid-cols-[50px_1fr_1fr_120px] px-4 py-3 text-gray-400 border-b border-white/10 text-sm">
        <p>#</p>
        <p>Song</p>
        <p>Artist</p>
        <p className="text-center">Actions</p>
      </div>

      {/* SONG LIST */}
     <div className="mt-3">

  {myPlaylist.map((e, i) => (

    <div
      key={e._id}
      className="
      flex md:grid
      md:grid-cols-[50px_1fr_1fr_120px]
      items-center
      gap-4
      px-4
      py-3
      border-b border-white/10
      hover:bg-white/5
      transition
      group
      cursor-pointer
      "
    >

      {/* Number */}
      <p className="hidden md:block text-gray-400">
        {i + 1}
      </p>

      {/* Song */}
      <div
        onClick={() => onclickHander(e)}
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
      >

        <img
          src={e.thumbnail.url}
          alt=""
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
        />

        <div className="min-w-0">

          <h3 className="font-semibold truncate group-hover:text-green-400 transition">
            {e.title}
          </h3>

          <p className="text-sm text-gray-400 truncate">
            {e.singer}
          </p>

        </div>

      </div>

      {/* Desktop Artist */}
      <p className="hidden md:block text-gray-300 truncate">
        {e.singer}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">

        <button
          onClick={() => savePlayListHandler(e._id)}
          className="text-gray-400 hover:text-yellow-400 transition text-lg cursor-pointer"
        >
          <FaBookmark />
        </button>

        <button
          onClick={() => onclickHander(e)}
          className="
            w-9
            h-9
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            hover:scale-110
            transition
            cursor-pointer
          "
        >
          <FaPlay
            className="text-black"
            size={12}
          />
        </button>

      </div>

    </div>

  ))}

</div>

    </div>
  </Layout>
);
}

export default PlayList