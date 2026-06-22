import { useState, useContext, createContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axios from "./axios";
import { UserData } from "./user";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const[newSongs , setNewSongs] = useState([]);
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
  const[queue , setQueue] = useState([]);
  const[albumQueue , setAlbumQueue] = useState([]);
  const[isAlbumMode , setIsAlbumMode] = useState(false);
  const [dashboardStats , setDashboardStats] = useState(null) ;
const [volume, setVolume] = useState(() => {
  return Number(localStorage.getItem("volume")) || 1;
});

  const { user } = UserData();

  const premiumAlertShown = useRef(false);




  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/songs/all");

      setSongs(data || []);

      if (data?.length > 0 && selectedSong === null) {
  setSelectedSong(data[0]._id);
  setIndex(0);
}
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
    fetchNewSongs();
  }, []);
  
  useEffect(() => {
  localStorage.setItem("isPlaying", isPlaying);
}, [isPlaying]);

 async function fetchSong() {
  try {
    if (!selectedSong) return;

    const { data } = await axios.get(
      "/api/songs/single/" + selectedSong
    );

    
    if (data.premium && !user?.isPremium) {
      toast.error("Premium Required");
      setSong(null);
      setIsPlaying(false);
      return;
    }

    setSong(data);
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  if (selectedSong) {
    localStorage.setItem("selectedSong", selectedSong);
  }
}, [selectedSong]);

useEffect(() => {
  if (selectedSong) {
    fetchSong();
    // setIsPlaying(true);
  }
}, [selectedSong]);


  
  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/songs/album/all");
      setAlbums(data || []);
    } catch (error) {
      console.log(error);
    }
  }

 
  async function addSong(
    formData, 
    setSongTitle, 
    setSongDescription, 
    setSongFile, 
    setSinger, setSongAlbum , setCategory) {
  setLoading(true);

  try {
    const { data } = await axios.post(
      "/api/songs/new",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(data.message);

    fetchSongs();

    setSongTitle("");
     setSongDescription("");
    setSongFile(null);
    setSinger("");
    setSongAlbum("");
    setCategory('')
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Error adding song");
  } finally {
    setLoading(false);
  }
}

async function fetchNewSongs() {
  try {
    const { data } = await axios.get("/api/songs/new");
    setNewSongs(data);
  } catch (error) {
    console.log(error);
  }
}


  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/songs/" + id);

      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  }

async function deleteAlbum(id) {
  try {
    const { data } = await axios.delete("/api/songs/album/" + id);

    toast.success(data.message);

    fetchAlbums();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete album failed");
  }
}

async function addThumbnail(id, formData, setThumbnail) {
  setLoading(true);

  try {
    const { data } = await axios.post(
      `/api/songs/thumbnail/${id}`,
      formData
    );

    toast.success(data.message);

    fetchSongs();

    setThumbnail(null); 
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Thumbnail upload failed");
  } finally {
    setLoading(false);
  }
}

  async function addAlbum(formData, reset) {
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/songs/album/new",
        formData
      );

      toast.success(data.message);

      fetchAlbums();
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding album");
    } finally {
      setLoading(false);
    }
  }

 function nextSong() {
  if (!songs.length) return;

  let newIndex = (index + 1) % songs.length;

  if (shuffle) {
  
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (
      songs[newIndex]?.premium &&
      !user?.isPremium &&
      songs.length > 1
    );
  } 
 
  const current = songs[newIndex];

  if (current?.premium && !user?.isPremium) {
    toast.error("Buy Premium to play this song");
    return;
  }

  setIndex(newIndex);
  setSelectedSong(current._id);
}

  function prevSong() {
  if (!songs.length) return;

  let newIndex;

  if (shuffle) {
    newIndex = Math.floor(Math.random() * songs.length);
  } else {
    newIndex = index <= 0 ? songs.length - 1 : index - 1;
  }

  const current = songs[newIndex];

  if (current?.premium && !user?.isPremium) {
    toast.error("Buy Premium to play this song");
    return;
  }

  setIndex(newIndex);
  setSelectedSong(current._id);
}

 const canPlaySong = (song) => {
  return !song?.premium || user?.isPremium;
};
  const searchedSongs =
    songs?.filter((song) => {
      const title = song?.title?.toLowerCase() || "";
      const singer = song?.singer?.toLowerCase() || "";
      const q = searchQuery.toLowerCase();

      return title.includes(q) || singer.includes(q);
    }) || [];

    const playAlbum = (albumSongs, startIndex = 0) => {
  setQueue(albumSongs);
  setSongs(albumSongs); 
  setIndex(startIndex);
  setSelectedSong(albumSongs[startIndex]._id);
  setIsPlaying(true);
};

  async function fetchDashboardStats() {
    
    try{

      const {data} = await axios.get("/api/admin/dashboard");

      setDashboardStats(data)

    }catch(error){

      console.log(error)

    }

  }

  return (
    <SongContext.Provider
      value={{
        songs,
        newSongs,
        setSongs ,
        albums,
        song,
        loading,
        selectedSong,
        setSelectedSong,
        isPlaying,
        addThumbnail,
        setIsPlaying,
        addSong,
        addAlbum,
        deleteSong,
        nextSong,
        prevSong,
        shuffle,
        setShuffle,
        fetchSong,
        fetchAlbums ,
        repeat,
        setRepeat,
        searchQuery,
        setSearchQuery,
        searchedSongs,
        canPlaySong ,
        deleteAlbum ,
        playAlbum ,
        queue , 
        setQueue ,
        dashboardStats ,
         setDashboardStats ,
        fetchDashboardStats ,
        fetchNewSongs ,
        volume ,
        setVolume
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);