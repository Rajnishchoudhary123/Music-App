const Album = require("../models/Album");
const Song = require("../models/Song");
const TryCatch = require("../utlis/TryCatch");
const getDatauri = require("../utlis/urlGenerater");
const cloudinary = require("cloudinary");

exports.createAlbum = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const fileUrl = getDatauri(file);

  const cloud = await cloudinary.v2.uploader.upload(
    fileUrl.content
  );

  await Album.create({
    title,
    description,
    thumbnail: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.json({
    message: "Album added",
  });
});

exports.getAllAlbums = TryCatch(async (req, res) => {
const albums = await Album.find();
res.json(albums);
});

exports.addSong = TryCatch(async (req, res) => {
  const { title, description, singer, album, category , premium } = req.body;

  const file = req.files?.file?.[0];
  const thumbnail = req.files?.thumbnail?.[0];

  if (!title || !description || !singer || !file || !category) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

 
  const fileBase64 = file.buffer.toString("base64");
  const audioUri = `data:${file.mimetype};base64,${fileBase64}`;

  const audioCloud = await cloudinary.v2.uploader.upload(audioUri, {
    resource_type: "video",
    folder: "songs",
  });

 
  let thumbnailCloud = null;

  if (thumbnail) {
    const thumbBase64 = thumbnail.buffer.toString("base64");
    const thumbUri = `data:${thumbnail.mimetype};base64,${thumbBase64}`;

    thumbnailCloud = await cloudinary.v2.uploader.upload(thumbUri, {
      folder: "thumbnails",
    });
  }


  const song = await Song.create({
    title,
    description,
    singer,
    premium ,
    category,
     owner: req.user._id, 
    album : album || null ,
    audio: {
      id: audioCloud.public_id,
      url: audioCloud.secure_url,
    },
    thumbnail: thumbnailCloud
      ? {
          id: thumbnailCloud.public_id,
          url: thumbnailCloud.secure_url,
        }
      : null,
  });

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
});

exports.getNewSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .sort({ createdAt: -1 }) 
      .limit(10); 

    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addThumbnail = TryCatch(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  console.log("PARAMS:", req.params);
  console.log("FILE OK");

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const song = await Song.findById(id);

  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }


  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;

  const cloud = await cloudinary.v2.uploader.upload(dataUri, {
    folder: "thumbnails",
  });

  song.thumbnail = {
    id: cloud.public_id,
    url: cloud.secure_url,
  };

  await song.save();

  res.json({
    message: "Thumbnail uploaded successfully",
    song,
  });
});


exports.getAllSongs = TryCatch(async (req, res) => {
const songs = await Song.find();
res.json(songs);
});

exports.getAllSongsByAlbum = TryCatch(async (req, res) => {

const album = await Album.findById(req.params.id);

const songs = await Song.find({ album: req.params.id });

res.json({ album, songs });

});

exports.deleteSong = TryCatch(async (req, res) => {

if (req.user.role !== "admin") {
    return res.status(403).json({
        message: "You are not admin"
    });
}

const song = await Song.findById(req.params.id);

if (!song) {
    return res.status(404).json({
        message: "Song not found"
    });
}

await song.deleteOne();

res.json({
    message: "Song deleted"
});

});

exports.deleteAlbum = TryCatch(async (req, res) => {
  const { id } = req.params;

  const album = await Album.findById(id);

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }


  await album.deleteOne();

  res.json({
    message: "Album deleted successfully",
  });
});

exports.getSingleSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    return res.status(404).json({
      message: "Song not found",
    });
  }

  if (song.premium && !req.user.isPremium) {
    return res.status(403).json({
      message: "Premium subscription required",
    });
  }

  res.json(song);
});

