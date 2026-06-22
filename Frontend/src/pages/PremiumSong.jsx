import { useEffect, useState } from "react";
import axios from "../Context/axois.js";

const PremiumSong = () => {

  const [songs,setSongs] =
  useState([]);

  useEffect(()=>{
    axios
    .get("/api/payment/premium")
    .then((res)=>{

      setSongs(res.data.songs);

    });

  },[]);

  return (
    <div>
      <h1>Premium Songs</h1>

      {songs.map(song=>(
        <div key={song._id}>
          {song.title}
        </div>
      ))}
    </div>
  );
};

export default PremiumSong;