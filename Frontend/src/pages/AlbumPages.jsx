// import React from "react";
// import { useParams } from "react-router-dom";
// import { SongData } from "../Context/song";
// import { FaPause, FaPlay } from "react-icons/fa6";
// import Player from "../components/Player";
// import Layout from "../components/Layout";

// const AlbumPage = () => {
//   const { id } = useParams();
//   const { albums, songs, setSelectedSong, setIsPlaying ,isPlaying  } = SongData();

//   const album = albums.find((a) => a._id === id);

//   const albumSongs = songs.filter((s) => s.album === id);

//   const playSong = (songId) => {
//   setSelectedSong(songId);
//   setIsPlaying(true);
// };

// const playAlbum = () => {
//   if (albumSongs.length === 0) return;

//   setSelectedSong(albumSongs[0]._id);
//   setIsPlaying(true);
// };



//   return (
// <Layout>
//   <div className="text-white p-6">

//     {/* Album Hero */}
//     <div className="bg-gradient-to-b from-purple-700 via-purple-900 to-transparent rounded-3xl p-8 mb-8">
//       <div className="flex flex-col md:flex-row items-center md:items-end gap-8">

//         <img
//           src={album?.thumbnail?.url}
//           alt={album?.title}
//           className="w-56 h-56 object-cover rounded-2xl shadow-2xl"
//         />

//         <div>
//           <p className="uppercase text-sm tracking-widest text-gray-300">
//             Album
//           </p>

//           <h1 className="text-5xl md:text-6xl font-bold mt-2">
//             {album?.title}
//           </h1>

//           <p className="text-gray-300 mt-3 max-w-2xl">
//             {album?.description}
//           </p>

//           <div className="mt-4 text-sm text-gray-400">
//             {albumSongs.length} Songs
//           </div>

//           <button
//             onClick={playAlbum}
//             className="mt-6 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-full flex items-center gap-3 transition-all"
//           >
//             {isPlaying ? <FaPause /> : <FaPlay />}
//             Play Album
//           </button>
//         </div>

//       </div>
//     </div>

//     {/* Songs Section */}
//     <div className="bg-[#121212] rounded-2xl overflow-hidden border border-[#252525]">

//       {/* Header */}
//       <div className="grid grid-cols-[60px_1fr_1fr] px-5 py-4 text-gray-400 border-b border-[#252525] text-sm">
//         <p>#</p>
//         <p>Title</p>
//         <p>Singer</p>
//       </div>

//       {/* Songs */}
//       {albumSongs.length === 0 ? (
//         <div className="p-10 text-center text-gray-400">
//           No songs in this album
//         </div>
//       ) : (
//         albumSongs.map((song, i) => (
//           <div
//             key={song._id}
//             onClick={() => playSong(song._id)}
//             className="
//               grid grid-cols-[60px_1fr_1fr]
//               items-center
//               px-5 py-3
//               hover:bg-[#ffffff12]
//               cursor-pointer
//               transition-all
//               group
//             "
//           >
//             <div className="flex items-center gap-3">
//               <span className="group-hover:hidden">
//                 {i + 1}
//               </span>

//               <FaPlay className="hidden group-hover:block text-green-400" />
//             </div>

//             <div className="flex items-center gap-4">
//               <img
//                 src={song.thumbnail?.url}
//                 alt=""
//                 className="w-12 h-12 rounded-md object-cover"
//               />

//               <div>
//                 <p className="font-medium">
//                   {song.title}
//                 </p>

//                 <p className="text-xs text-gray-400">
//                   Song
//                 </p>
//               </div>
//             </div>

//             <p className="text-gray-300">
//               {song.singer}
//             </p>
//           </div>
//         ))
//       )}
//     </div>

//   </div>
// </Layout>
//   );
// };

// export default AlbumPage;