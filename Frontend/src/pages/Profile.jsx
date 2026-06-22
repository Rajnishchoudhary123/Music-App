import React from "react";
import Layout from "../components/Layout";
import { UserData } from "../Context/user";

const Profile = () => {
  const { user } = UserData();

  return (
  <Layout>
    <div className="min-h-screen flex items-center justify-center p-6 text-white">

      <div className="
        w-full max-w-md
        bg-[#0f0f0f]/80
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-8
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
        text-center
      ">

        
        <div className="flex justify-center">
          <div className="
            w-28 h-28
            rounded-full
            bg-gradient-to-br from-green-400 to-emerald-600
            flex items-center justify-center
            text-4xl font-bold
            shadow-[0_0_30px_rgba(34,197,94,0.5)]
            hover:scale-105 transition
          ">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

      
        <h2 className="text-3xl font-bold mt-5">
          {user?.name}
        </h2>

        <p className="text-gray-400 mt-1">
          {user?.email}
        </p>

      
        <div className="
          mt-6
          bg-[#1a1a1a]/80
          border border-white/10
          rounded-2xl
          p-5
          text-left
        ">

          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-400">Role</span>
            <span className="font-medium text-white">
              {user?.role}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Premium</span>

            <span
              className={`font-semibold ${
                user?.isPremium ? "text-green-400" : "text-red-400"
              }`}
            >
              {user?.isPremium ? "Active ✨" : "Not Active"}
            </span>
          </div>

        </div>

       
        {user?.isPremium && (
          <div className="
            mt-5
            inline-block
            px-4 py-2
            rounded-full
            bg-gradient-to-r from-green-500 to-emerald-600
            text-black
            font-semibold
          ">
            👑 Premium User
          </div>
        )}

      </div>

    </div>
  </Layout>
)
};

export default Profile;