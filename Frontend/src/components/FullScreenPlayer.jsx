// import React from "react";
// import { SongData } from "../Context/song";
// import { FaTimes, FaPlay, FaPause, FaRandom } from "react-icons/fa";
// import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
// import { TbRepeat } from "react-icons/tb";

// const FullScreenPlayer = () => {
//   const {
//     showFullPlayer,
//     setShowFullPlayer,
//     song,
//     nextSong,
//     prevSong,
//     isPlaying,
//     shuffle,
//     setShuffle,
//     repeat,
//     setRepeat,
//     togglePlay,
//   } = SongData();

//   if (!showFullPlayer || !song) return null;

//   return (
//     <div className="fixed inset-0 z-[999] bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] text-white flex flex-col items-center justify-center px-6">
//       <button
//         onClick={() => setShowFullPlayer(false)}
//         className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
//       >
//         <FaTimes />
//       </button>

//       <img
//         src={song?.thumbnail?.url}
//         alt={song?.title}
//         className="w-72 h-72 md:w-96 md:h-96 rounded-3xl shadow-2xl object-cover"
//       />

//       <h1 className="text-3xl font-bold mt-6 text-center">{song?.title}</h1>
//       <p className="text-gray-400 text-center mt-1">{song?.singer}</p>

//       <div className="flex items-center gap-6 mt-10 text-2xl">
//         <FaRandom
//           onClick={() => setShuffle(!shuffle)}
//           className={`cursor-pointer ${shuffle ? "text-green-400" : ""}`}
//         />

//         <GrChapterPrevious
//           onClick={prevSong}
//           className="cursor-pointer"
//         />

//         <button
//           onClick={togglePlay}
//           className="bg-white text-black p-4 rounded-full"
//         >
//           {isPlaying ? <FaPause /> : <FaPlay />}
//         </button>

//         <GrChapterNext
//           onClick={nextSong}
//           className="cursor-pointer"
//         />

//         <TbRepeat
//           onClick={() =>
//             setRepeat(
//               repeat === "off"
//                 ? "one"
//                 : repeat === "one"
//                 ? "all"
//                 : "off"
//             )
//           }
//           className={`cursor-pointer ${repeat !== "off" ? "text-green-400" : ""}`}
//         />
//       </div>
//     </div>
//   );
// };

// export default FullScreenPlayer;