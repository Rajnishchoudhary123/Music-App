import React, { useEffect } from "react";
import { SongData } from "../Context/song";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Albums = () => {
  const { albums, fetchAlbums } = SongData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (

    <Layout>
     <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Albums</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums?.map((album) => (
          <div
            key={album._id}
            className="bg-[#181818] p-3 rounded cursor-pointer hover:bg-[#2a2a2a]"
            onClick={() => navigate(`/album/${album._id}`)}
          >
            <img
              src={album.thumbnail.url}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="mt-2 font-bold">{album.title}</h2>
            <p className="text-sm text-gray-400">
              {album.description}
            </p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Albums;