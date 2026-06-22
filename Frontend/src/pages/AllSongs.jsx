import React from "react";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../Context/song";

const AllSongs = () => {
  const { songs } = SongData();

  return (
    <Layout>
      <div className="p-5 md:p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">All Songs</h1>

        <div className="flex flex-wrap gap-4">
          {songs.map((song) => (
            <SongItem
              key={song._id}
              image={song.thumbnail?.url}
              name={song.title}
              desc={song.description}
              id={song._id}
              singer={song.singer}
              premium={song.premium}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllSongs;