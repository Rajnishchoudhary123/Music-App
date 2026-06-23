import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 border border-white/20 shadow-xl">
        
        <div className="w-14 h-14 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white text-sm tracking-wider">
          Loading music...
        </p>

      </div>
    </div>
  );
};

export default Loading;