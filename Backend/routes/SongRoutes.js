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
  getNewSongs
} = require("../Controller/SongController.js");

const router = express.Router();


router.post("/album/new", uploadFile, isAuth, createAlbum);
router.get("/album/all", isAuth, getAllAlbums);
router.get("/album/:id", isAuth, getAllSongsByAlbum);
router.post("/new", uploadFile, isAuth, addSong);
router.get("/all", isAuth, getAllSongs);
router.get("/single/:id", isAuth, getSingleSong);
router.post("/thumbnail/:id",isAuth , uploadFile, addThumbnail);
router.delete("/:id", isAuth, deleteSong);
router.delete("/album/:id", isAuth, deleteAlbum);
router.get("/new" , isAuth , getNewSongs)

module.exports = router;