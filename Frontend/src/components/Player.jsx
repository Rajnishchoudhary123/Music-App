import React, { useEffect, useState } from "react";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import {
  FaPause,
  FaPlay,
  FaRandom,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { TbRepeat } from "react-icons/tb";

import { SongData } from "../Context/song";

const Player = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [muted, setMuted] = useState(false);

  const {
    song,
    isPlaying,
    setIsPlaying,
    nextSong,
    prevSong,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    setShowFullPlayer,
    audioRef,
    volume,
    setVolume,
  } = SongData();

  const progressKey = song?._id ? `songProgress_${song._id}` : "songProgress";

  useEffect(() => {
  console.log("Player Mounted");

  return () => {
    console.log("Player Unmounted");
  };
}, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.audio?.url) return;

    const handleLoaded = () => {
      setDuration(audio.duration || 0);

      const savedTime = Number(localStorage.getItem(progressKey)) || 0;
      if (savedTime < (audio.duration || 0)) {
        audio.currentTime = savedTime;
      }
    };

    const handleTime = () => {
      setProgress(audio.currentTime || 0);
      localStorage.setItem(progressKey, audio.currentTime);
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
  }, [audioRef, song?._id, song?.audio?.url, repeat, nextSong, progressKey]);


 useEffect(() => {
  const audio = audioRef.current;

  if (!audio || !song?.audio?.url) return;


  if (audio.dataset.songId !== song._id) {
    audio.dataset.songId = song._id;
    audio.src = song.audio.url;
    audio.load();
  }

  if (isPlaying) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}, [song?._id, isPlaying]);

  // volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
  }, [audioRef, volume, muted]);

  const handlePlayPause = async (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Play/Pause error:", error);
    }
  };

  const handleProgressChange = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!song || !song.audio?.url) return null;

  return (
    <>
      {/* ✅ ONLY ONE AUDIO TAG IN WHOLE APP */}
      <audio ref={audioRef} preload="metadata" />

      <div
        className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 text-white z-50"
        onClick={() => setShowFullPlayer(true)}
      >
        {/* MOBILE */}
        <div className="md:hidden px-3 pt-2 pb-3">
          <div className="grid grid-cols-[48px_1fr_auto] items-center gap-3">
            <img
              src={song.thumbnail?.url}
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{song.title}</p>
              <p className="text-xs text-gray-400 truncate">{song.singer}</p>
            </div>

            <div
              className="flex items-center gap-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSong();
                }}
                className="text-lg p-1"
              >
                <GrChapterPrevious />
              </button>

              <button
                onClick={handlePlayPause}
                className="bg-white text-black p-2.5 rounded-full flex items-center justify-center"
              >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSong();
                }}
                className="text-lg p-1"
              >
                <GrChapterNext />
              </button>
            </div>
          </div>

          <div
            className="mt-2 flex items-center gap-2 text-[11px] text-gray-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="w-9 text-left">{formatTime(progress)}</span>

            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (progress / duration) * 100 : 0}
              onChange={handleProgressChange}
              className="w-full accent-green-500 cursor-pointer"
            />

            <span className="w-9 text-right">{formatTime(duration)}</span>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex h-24 px-4 items-center justify-between">
          <div className="flex items-center gap-3 w-[25%] min-w-0">
            <img
              src={song.thumbnail?.url}
              alt={song.title}
              className="w-14 h-14 rounded-lg object-cover shadow-lg shrink-0"
            />

            <div className="min-w-0">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-gray-400 text-sm truncate">{song.singer}</p>
            </div>
          </div>

          <div className="flex flex-col items-center w-[50%] px-4">
            <div
              className="flex items-center gap-5 text-lg"
              onClick={(e) => e.stopPropagation()}
            >
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

            <div
              className="flex items-center gap-3 text-xs text-gray-400 w-full mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{formatTime(progress)}</span>

              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="w-full accent-green-500 cursor-pointer"
              />

              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div
            className="flex items-center gap-3 w-[20%] justify-end"
            onClick={(e) => e.stopPropagation()}
          >
            <span onClick={toggleMute} className="cursor-pointer">
              {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
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
    </>
  );
};

export default Player;