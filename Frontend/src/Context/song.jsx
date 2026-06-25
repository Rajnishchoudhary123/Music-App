import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "./axios.js";
import { UserData } from "./user";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedSong, setSelectedSong] = useState(() => {
    return localStorage.getItem("selectedSong") || null;
  });

  const [song, setSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem("isPlaying") === "true";
  });

  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");
  const [searchQuery, setSearchQuery] = useState("");
  const [queue, setQueue] = useState([]);
  const [albumQueue, setAlbumQueue] = useState([]);
  const [isAlbumMode, setIsAlbumMode] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("volume");
    return saved ? Number(saved) : 1;
  });

  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const { user } = UserData();

  // -------------------------------
  // Helpers
  // -------------------------------
  const canPlaySong = (song) => {
    return !song?.premium || user?.isPremium;
  };

  // -------------------------------
  // Fetch all songs
  // -------------------------------
  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/songs/all", {
        withCredentials: true,
      });

      const songsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.songs)
        ? data.songs
        : [];

      setSongs(songsArray);

      if (songsArray.length > 0 && !selectedSong) {
        setSelectedSong(songsArray[0]._id);
        setIndex(0);
      }
    } catch (error) {
      console.log("fetchSongs error:", error);
      setSongs([]);
    }
  }

  // -------------------------------
  // Fetch single selected song
  // -------------------------------
  async function fetchSong() {
    try {
      if (!selectedSong) return;

      const { data } = await axios.get("/api/songs/single/" + selectedSong, {
        withCredentials: true,
      });

      if (data?.premium && !user?.isPremium) {
        toast.error("Premium Required");
        setSong(null);
        setIsPlaying(false);
        return;
      }

      setSong(data);
    } catch (error) {
      console.log("fetchSong error:", error);
    }
  }

  // -------------------------------
  // Fetch albums
  // -------------------------------
  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/songs/album/all", {
        withCredentials: true,
      });

      const albumsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.albums)
        ? data.albums
        : [];

      setAlbums(albumsArray);
    } catch (error) {
      console.log("fetchAlbums error:", error);
      setAlbums([]);
    }
  }

  // -------------------------------
  // Fetch premium songs
  // -------------------------------
  async function fetchPremiumSongs() {
    try {
      const { data } = await axios.get("/api/payment/premium", {
        withCredentials: true,
      });

      return data?.songs || [];
    } catch (error) {
      console.log("fetchPremiumSongs error:", error);
      toast.error(error?.response?.data?.message || "Premium songs nahi mile");
      return [];
    }
  }

  // -------------------------------
  // Add song
  // -------------------------------
  async function addSong(
    formData,
    setSongTitle,
    setSongDescription,
    setSongFile,
    setSinger,
    setSongAlbum,
    setCategory
  ) {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/songs/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(data.message);
      fetchSongs();

      setSongTitle("");
      setSongDescription("");
      setSongFile(null);
      setSinger("");
      setSongAlbum("");
      setCategory("");
    } catch (error) {
      console.log(error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Error adding song");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // Delete song
  // -------------------------------
  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/songs/" + id, {
        withCredentials: true,
      });

      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  }

  // -------------------------------
  // Delete album
  // -------------------------------
  async function deleteAlbum(id) {
    try {
      const { data } = await axios.delete("/api/songs/album/" + id, {
        withCredentials: true,
      });

      toast.success(data.message);
      fetchAlbums();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete album failed");
    }
  }

  // -------------------------------
  // Add thumbnail
  // -------------------------------
  async function addThumbnail(id, formData, setThumbnail) {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `/api/songs/thumbnail/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      fetchSongs();
      setThumbnail(null);
    } catch (error) {
      console.log(error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Thumbnail upload failed");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // Add album
  // -------------------------------
  async function addAlbum(formData, reset) {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/songs/album/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(data.message);
      fetchAlbums();

      if (reset) reset();
    } catch (error) {
      console.log("Album add error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Error adding album");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // Play specific song manually
  // -------------------------------
  function playSong(songToPlay, songList = songs) {
    if (!songToPlay) return;

    if (songToPlay.premium && !user?.isPremium) {
      toast.error("Buy Premium to play this song");
      return;
    }

    const songIndex = songList.findIndex((s) => s._id === songToPlay._id);

    if (songIndex !== -1) {
      setSongs(songList);
      setIndex(songIndex);
    }

    setSelectedSong(songToPlay._id);
    setSong(songToPlay);
    setIsPlaying(true);
  }

  // -------------------------------
  // Next song
  // -------------------------------
  function nextSong() {
    if (!songs.length) return;

    let newIndex = index;

    if (shuffle) {
      const playableSongs = songs.filter((s) => canPlaySong(s));

      if (playableSongs.length === 0) {
        toast.error("No playable songs available");
        return;
      }

      const randomSong =
        playableSongs[Math.floor(Math.random() * playableSongs.length)];

      const actualIndex = songs.findIndex((s) => s._id === randomSong._id);

      setIndex(actualIndex);
      setSelectedSong(randomSong._id);
      setIsPlaying(true);
      return;
    }

    let attempts = 0;
    do {
      newIndex = (newIndex + 1) % songs.length;
      attempts++;
      if (attempts > songs.length) {
        toast.error("No playable next song");
        return;
      }
    } while (!canPlaySong(songs[newIndex]));

    setIndex(newIndex);
    setSelectedSong(songs[newIndex]._id);
    setIsPlaying(true);
  }

  // -------------------------------
  // Previous song
  // -------------------------------
  function prevSong() {
    if (!songs.length) return;

    let newIndex = index;

    if (shuffle) {
      const playableSongs = songs.filter((s) => canPlaySong(s));

      if (playableSongs.length === 0) {
        toast.error("No playable songs available");
        return;
      }

      const randomSong =
        playableSongs[Math.floor(Math.random() * playableSongs.length)];

      const actualIndex = songs.findIndex((s) => s._id === randomSong._id);

      setIndex(actualIndex);
      setSelectedSong(randomSong._id);
      setIsPlaying(true);
      return;
    }

    let attempts = 0;
    do {
      newIndex = newIndex <= 0 ? songs.length - 1 : newIndex - 1;
      attempts++;
      if (attempts > songs.length) {
        toast.error("No playable previous song");
        return;
      }
    } while (!canPlaySong(songs[newIndex]));

    setIndex(newIndex);
    setSelectedSong(songs[newIndex]._id);
    setIsPlaying(true);
  }

  // -------------------------------
  // Play album
  // -------------------------------
  function playAlbum(albumSongs, startIndex = 0) {
    if (!albumSongs?.length) return;

    const firstSong = albumSongs[startIndex];

    if (firstSong?.premium && !user?.isPremium) {
      toast.error("Buy Premium to play this song");
      return;
    }

    setQueue(albumSongs);
    setAlbumQueue(albumSongs);
    setIsAlbumMode(true);
    setSongs(albumSongs);
    setIndex(startIndex);
    setSelectedSong(firstSong._id);
    setSong(firstSong);
    setIsPlaying(true);
  }

  // -------------------------------
  // Search songs
  // -------------------------------
  const searchedSongs = Array.isArray(songs)
    ? songs.filter((song) => {
        const title = song?.title?.toLowerCase() || "";
        const singer = song?.singer?.toLowerCase() || "";
        const q = searchQuery.toLowerCase();

        return title.includes(q) || singer.includes(q);
      })
    : [];

  // -------------------------------
  // Dashboard stats
  // -------------------------------
  async function fetchDashboardStats() {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        withCredentials: true,
      });

      setDashboardStats(data);
    } catch (error) {
      console.log("fetchDashboardStats error:", error);
    }
  }

  // -------------------------------
  // Toggle play/pause
  // -------------------------------
  const togglePlay = () => {
    const audio = document.querySelector("audio");
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // -------------------------------
  // Initial load
  // -------------------------------
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  // -------------------------------
  // Save selected song
  // -------------------------------
  useEffect(() => {
    if (selectedSong) {
      localStorage.setItem("selectedSong", selectedSong);
    }
  }, [selectedSong]);

  // -------------------------------
  // Save playing state
  // -------------------------------
  useEffect(() => {
    localStorage.setItem("isPlaying", isPlaying);
  }, [isPlaying]);

  // -------------------------------
  // Save volume
  // -------------------------------
  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  // -------------------------------
  // Refetch selected song when:
  // 1. selected song changes
  // 2. user premium status changes
  // -------------------------------
  useEffect(() => {
    if (selectedSong) {
      fetchSong();
    }
  }, [selectedSong, user?.isPremium]);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        newSongs,
        albums,
        song,
        loading,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        index,
        setIndex,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        searchQuery,
        setSearchQuery,
        searchedSongs,
        queue,
        setQueue,
        albumQueue,
        setAlbumQueue,
        isAlbumMode,
        setIsAlbumMode,
        dashboardStats,
        setDashboardStats,
        volume,
        setVolume,
        showFullPlayer,
        setShowFullPlayer,

        fetchSongs,
        fetchSong,
        fetchAlbums,
        fetchPremiumSongs,
        fetchDashboardStats,

        addSong,
        addAlbum,
        addThumbnail,
        deleteSong,
        deleteAlbum,

        nextSong,
        prevSong,
        playSong,
        playAlbum,
        togglePlay,
        canPlaySong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);