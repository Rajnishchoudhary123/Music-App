import React from 'react'
import { FaMusic } from "react-icons/fa";
import { UserData } from '../Context/user';
const PlayListCard = ({ collapsed }) => {

  const { user } = UserData();

  return (
    <div className="bg-[#1a1a1a] hover:bg-[#222] transition rounded-xl p-3 cursor-pointer">
      {collapsed ? (
        <div className="text-center text-xl">🎵</div>
      ) : (
        <>
          <h3 className="font-semibold">My Playlist</h3>
          <p className="text-sm text-gray-400">Your saved songs</p>
        </>
      )}
    </div>
  );
};

export default PlayListCard;

