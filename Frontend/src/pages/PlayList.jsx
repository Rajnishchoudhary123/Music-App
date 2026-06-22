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
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">

        <img
          src={
            myPlaylist && myPlaylist[0]
              ? myPlaylist[0].thumbnail.url
              : "https://via.placeholder.com/200"
          }
          className="w-44 h-44 object-cover rounded-2xl shadow-2xl"
          alt=""
        />

        <div>
          <p className="text-gray-400 uppercase tracking-widest text-sm">
            Playlist
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            {user?.name} Playlist
          </h1>

          <p className="text-gray-400 mt-3">
            Your favorite songs collection 🎧
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {myPlaylist.length} songs
          </p>
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
      <div className="mt-4 space-y-2">

        {myPlaylist.map((e, i) => (
          <div
            key={e._id}
            className="
              grid
              grid-cols-[50px_1fr]
              md:grid-cols-[50px_1fr_1fr_120px]
              items-center
              gap-3
              px-4 py-3
              rounded-xl
              bg-[#121212]/60
              border border-white/5
              hover:bg-white/5
              transition-all
              group
            "
          >

            {/* INDEX */}
            <p className="text-gray-400 group-hover:text-white">
              {i + 1}
            </p>

            {/* SONG INFO */}
            <div className="flex items-center gap-3">

              <img
                src={e.thumbnail.url}
                className="w-12 h-12 rounded-md object-cover"
                alt=""
              />

              <div>
                <p className="font-medium group-hover:text-green-400 transition">
                  {e.title}
                </p>

                <p className="text-xs text-gray-400 hidden md:block">
                  {e.description.slice(0, 30)}...
                </p>
              </div>

            </div>

            {/* ARTIST */}
            <p className="text-gray-300 hidden md:block">
              {e.singer}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end md:justify-center items-center gap-4">

              {/* BOOKMARK */}
              <button
                onClick={() => savePlayListHandler(e._id)}
                className="
                  text-gray-400 hover:text-yellow-400
                  transition text-lg
                "
              >
                <FaBookmark />
              </button>

              {/* PLAY */}
              <button
                onClick={() => onclickHander(e)}
                className="
                  text-gray-400 hover:text-green-400
                  transition text-lg
                "
              >
                <FaPlay />
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