const express = require("express");
const { toggleLikeSong, getLikedSongs } = require("../Controller/likeController.js");
const isAuth = require("../middlewear/isAuth.js");
const router = express.Router();

router.post("/like/:id", isAuth , toggleLikeSong);
router.get("/liked", isAuth, getLikedSongs);

module.exports = router;