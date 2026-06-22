const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    category : {

      type : String ,

      enum: [
   "today-biggest-hits",
   "new-release",
   "hindi-hits",
   "2010",
   "hip-hop",
   "sad-Songs" ,
   "premium-songs"

]
    },
    singer: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    thumbnail: {
      id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    createdAt: {
  type: Date,
  default: Date.now
},

    audio: {
      id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        required: true,
      },
    },

    premium: {
      type: Boolean,
      default: false,
    },

    playCount :{

      type : Number ,

      default : 0

    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      index: true,
    },
  },
  { timestamps: true }
);


SongSchema.index({ title: "text", singer: "text" });

module.exports = mongoose.model("Song", SongSchema);