import React, { useEffect, useRef, useState } from "react";
import {
  GrChapterPrevious,
  GrChapterNext,
} from "react-icons/gr";
import {
  FaPause,
  FaPlay,
  FaRandom,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { TbRepeat } from "react-icons/tb";

import { SongData } from "../Context/song";
import { UserData } from "../Context/user";

const Player = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(() => {
    return Number(localStorage.getItem("volume")) ?? 1;
  });

  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  const {
    song,
    fetchSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextSong,
    prevSong,
    shuffle,
    setShuffle,
    repeat,
    setRepeat, 
    setShowFullPlayer
  } = SongData();

  const { user } = UserData();

  useEffect(() => {
    if (selectedSong) fetchSong();
  }, [selectedSong]);

  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    const handleLoaded = () => {
      setDuration(audio.duration || 0);

      const savedTime =
        Number(localStorage.getItem("songProgress")) || 0;

      audio.currentTime = savedTime;

      if (isPlaying) audio.play().catch(() => {});
    };

    const handleTime = () => {
      setProgress(audio.currentTime || 0);
      localStorage.setItem("songProgress", audio.currentTime);
    };

    const handleEnd = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
        return;
      }
      nextSong();
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTime);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [song, repeat]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted, song]);

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);

    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!song || !song.audio) return null;

  return (
    <div   className="h-20 bg-black cursor-pointer" onClick={() => setShowFullPlayer(true)}>
    <div className="fixed bottom-0 left-0 w-full h-24 bg-black/70 backdrop-blur-xl border-t border-white/10 text-white px-4 flex items-center justify-between z-50">

    
      <div className="flex items-center gap-3 w-[25%]">
        <img
          src={song.thumbnail?.url}
          className="w-14 h-14 rounded-lg object-cover shadow-lg"
        />

        <div className="hidden md:block">
          <p className="font-medium">{song.title}</p>
          <p className="text-gray-400 text-sm">{song.singer}</p>
        </div>
      </div>

      <audio ref={audioRef} src={song.audio.url} />

      <div className="flex flex-col items-center w-[50%]">

        <div className="flex items-center gap-5 text-lg">

          <FaRandom
            onClick={() => setShuffle(!shuffle)}
            className={`cursor-pointer transition hover:scale-110 ${
              shuffle ? "text-green-400" : "text-white/70"
            }`}
          />

          <GrChapterPrevious
            onClick={prevSong}
            className="cursor-pointer hover:scale-110 transition"
          />

          <button
            onClick={handlePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <GrChapterNext
            onClick={nextSong}
            className="cursor-pointer hover:scale-110 transition"
          />

          <TbRepeat
            onClick={() =>
              setRepeat(
                repeat === "off"
                  ? "one"
                  : repeat === "one"
                  ? "all"
                  : "off"
              )
            }
            className={`cursor-pointer transition hover:scale-110 ${
              repeat !== "off" ? "text-green-400" : "text-white/70"
            }`}
          />
        </div>

       
        <div className="flex items-center gap-3 text-xs text-gray-400 w-full mt-1">

          <span>{formatTime(progress)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (progress / duration) * 100 : 0}
            onChange={handleProgressChange}
            className="w-full accent-green-500 cursor-pointer"
          />

          <span>-{formatTime(duration - progress)}</span>
        </div>
      </div>

     
      <div className="hidden md:flex items-center gap-3 w-[20%] justify-end">

        <span onClick={toggleMute} className="cursor-pointer">
          {muted || volume === 0 ? (
            <FaVolumeMute />
          ) : (
            <FaVolumeUp />
          )}
        </span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="accent-green-500 w-24 cursor-pointer"
        />
      </div>

    </div>
    </div>
  );
};

export default Player;