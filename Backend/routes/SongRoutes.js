const express = require("express");
const isAuth = require("../middlewear/isAuth");
const uploadFile = require("../middlewear/multer");

const {
  createAlbum,
  getAllAlbums,
  addSong,
  addThumbnail,
  getAllSongs,
  getAllSongsByAlbum,
  deleteSong,
  getSingleSong,
  deleteAlbum,
  getNewSongs,
} = require("../Controller/SongController.js");

const router = express.Router();

// ---------------- PUBLIC ROUTES ----------------
router.get("/all", getAllSongs);
router.get("/album/all", getAllAlbums);
router.get("/latest", getNewSongs);
router.get("/single/:id", getSingleSong);
router.get("/album/:id", getAllSongsByAlbum);

// ---------------- PROTECTED ROUTES ----------------
router.post("/new", uploadFile, isAuth, addSong);
router.post("/thumbnail/:id", isAuth, uploadFile, addThumbnail);
router.post("/album/new", uploadFile, isAuth, createAlbum);
router.delete("/:id", isAuth, deleteSong);
router.delete("/album/:id", isAuth, deleteAlbum);

module.exports = router;