import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { UserData } from "../Context/user";
import { SongData } from "../Context/song";

const Admin = () => {
  const { user } = UserData();
  const {
    albums,
    songs,
    addAlbum,
    loading,
    addSong,
    addThumbnail,
    deleteSong,
  } = SongData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumFile, setAlbumFile] = useState(null);


  const [songTitle , setSongTitle] = useState('')
  const [songDescription , setSongDescription] = useState('')
  const [singer, setSinger] = useState('');
  const [songAlbum, setSongAlbum] = useState("");
  const [songFile , setSongFile] = useState(null);
  const [songThumbnail, setSongThumbnail] = useState(null);
  const [premium, setPremium] = useState(false);
  const[category , setCategory] = useState("today-biggest-hits")

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    setThumbnailFile(file)
    
  };

const addAlbumHandler = async (e) => {
  e.preventDefault();

  if (!albumTitle || !albumDescription || !albumFile) {
    return alert("Please fill all album fields");
  }

  const formData = new FormData();
  formData.append("title", albumTitle);
  formData.append("description", albumDescription);
  formData.append("file", albumFile);

  console.log("Album title:", albumTitle);
  console.log("Album description:", albumDescription);
  console.log("Album file:", albumFile);

  await addAlbum(formData, () => {
    setAlbumTitle("");
    setAlbumDescription("");
    setAlbumFile(null);
  });
};

  const addSongHandler =  async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title" , songTitle),
    formData.append("description" , songDescription),
    formData.append("singer" , singer),
    formData.append("album" , songAlbum),
    formData.append("file" , songFile) ,
    formData.append("category", category);
    formData.append("thumbnail", songThumbnail);
    formData.append("premium" , premium)
 await addSong(
  formData,
  setSongTitle,
  setSongDescription,
  setSongFile,
  setSinger,
  setSongAlbum ,
  setCategory ,
  setSongThumbnail,
  setPremium
);

console.log(songTitle ,songDescription ,singer ,songAlbum , songFile ,category)
   
  };
const addThumbnailHandler = (id) => {

  const formData = new FormData();
  formData.append("file", thumbnailFile);

  addThumbnail(id, formData, setThumbnailFile );
};

  const deleteHandler = (id) => {
    if (confirm("are you sure you want to delete this song")) {
      deleteSong(id);
    }
  };
  return (
  <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f0f] to-[#121212] text-white p-6 md:p-10">

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

      <Link
        to="/"
        className="bg-green-500 hover:bg-green-400 transition text-black font-semibold py-2 px-5 rounded-full w-fit"
      >
        ← Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold">
        Admin Dashboard 🎧
      </h1>

    </div>

   
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    
      <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-semibold mb-4">➕ Add Album</h2>

        <form onSubmit={addAlbumHandler} className="space-y-4">

          <input
            type="text"
            placeholder="Album Title"
            className="w-full p-3 rounded-xl bg-[#1f1f1f] border border-white/10 focus:outline-none focus:border-green-500"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full p-3 rounded-xl bg-[#1f1f1f] border border-white/10 focus:outline-none focus:border-green-500"
            value={albumDescription}
            onChange={(e) => setAlbumDescription(e.target.value)}
            required
          />

          <input
            type="file"
            className="w-full text-sm"
            accept="image/*"
            onChange={(e) => setAlbumFile(e.target.files[0])}
            required
          />

          <button
            disabled={loading}
            className="w-full py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold transition"
          >
            {loading ? "Uploading..." : "Add Album"}
          </button>

        </form>
      </div>

    
      <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-semibold mb-4">🎵 Add Song</h2>

        <form onSubmit={addSongHandler} className="space-y-3">

          <input
            type="text"
            placeholder="Song Title"
            className="w-full p-3 rounded-xl bg-[#1f1f1f] border border-white/10 focus:border-green-500"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full p-3 rounded-xl bg-[#1f1f1f]"
            value={songDescription}
            onChange={(e) => setSongDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Singer"
            className="w-full p-3 rounded-xl bg-[#1f1f1f]"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
          />

          <select
            className="w-full p-3 rounded-xl bg-[#1f1f1f]"
            value={songAlbum}
            onChange={(e) => setSongAlbum(e.target.value)}
          >
            <option value="">Choose Album</option>
            {albums?.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-xl bg-[#1f1f1f]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="today-biggest-hits">Today's Hits</option>
            <option value="new-release">New Release</option>
            <option value="premium-songs">Premium</option>
            <option value="hindi-hits">Hindi Hits</option>
            <option value="2010">2010s</option>
            <option value="hip-hop">Hip Hop</option>
            <option value="sad-Songs">Sad Songs</option>
          </select>

            <h3>Add Audio</h3>
          <input
            type="file"
            accept="audio/*"
            className="w-full text-sm"
            onChange={(e) => setSongFile(e.target.files[0])}
          />

          <h3>Add Thumbnail</h3>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => setSongThumbnail(e.target.files[0])}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={premium}
              onChange={(e) => setPremium(e.target.checked)}
            />
            Premium Song 🔒
          </label>

          <button
            disabled={loading}
            className="w-full py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold"
          >
            {loading ? "Uploading..." : "Add Song"}
          </button>

        </form>
      </div>
    </div>

   
    <div className="mt-10">

      <h3 className="text-2xl font-bold mb-5">🎶 Songs Library</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {songs?.map((e) => (
         <div
  key={e._id}
  className="bg-[#141414]/80 border border-white/10 rounded-2xl p-4 hover:scale-[1.02] transition flex flex-col gap-3"
>

  {e.thumbnail ? (
    <img
      src={e.thumbnail.url}
      className="w-full h-40 object-cover rounded-xl"
      alt=""
    />
  ) : (
    <div className="w-full h-40 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
      No Thumbnail
    </div>
  )}


  <div>
    <h4 className="font-semibold">{e.title}</h4>
    <p className="text-sm text-gray-400">{e.singer}</p>
    <p className="text-xs text-gray-500">{e.description}</p>
  </div>

 
  <div className="flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-xl">

    <input
      type="file"
      accept="image/*"
      onChange={fileChangeHandler}
      className="text-xs w-full"
    />

    <button
      onClick={() => addThumbnailHandler(e._id)}
      className="px-3 py-1 bg-green-500 text-black text-sm rounded-lg hover:bg-green-400 transition whitespace-nowrap"
    >
      Add
    </button>

  </div>

  <div className="flex items-center justify-between mt-2">

    <span className="text-xs text-gray-500">
      Song ID: {e._id.slice(0, 6)}...
    </span>

    <button
      onClick={() => deleteHandler(e._id)}
      className="
        flex items-center gap-2
        px-3 py-1.5
        bg-red-500 hover:bg-red-400
        text-white
        rounded-lg
        transition
      "
    >
      <MdDelete />
      Delete
    </button>

  </div>

</div>
        ))}

      </div>
    </div>

  </div>
);
};

export default Admin;