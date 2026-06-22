const User = require("../models/user.js");
const Song = require("../models/Song.js");


exports.toggleLikeSong = async (req, res) => {
  const user = await User.findById(req.user._id);

  const songId = req.params.id;

  const alreadyLiked = user.likedSongs.includes(songId);

  if (alreadyLiked) {
    user.likedSongs = user.likedSongs.filter(
      (id) => id.toString() !== songId
    );
  } else {
    user.likedSongs.push(songId);
  }

  await user.save();

  res.json({ message: "Updated liked songs" });
};


exports.getLikedSongs = async (req, res) => {
  const user = await User.findById(req.user._id).populate("likedSongs");

  res.json(user.likedSongs);
};