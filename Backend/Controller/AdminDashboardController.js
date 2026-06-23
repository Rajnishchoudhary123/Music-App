const User = require('../models/user');
const Song = require('../models/Song');
const Album = require('../models/Album');
const TryCatch = require('../utlis/TryCatch');

exports.getDashboardState = TryCatch(async(req , res)=>{

 const totalUser = await User.countDocuments();

 const totalSong = await Song.countDocuments();

 const totalAlbum = await Album.countDocuments();

 const premiumUser = await User.countDocuments({

    isPremium : true 
 })

    const topSong = await Song.find()
    .sort({playCount : -1})
    .limit(5)
 
 res.status(200).json({

    totalUser ,
    totalSong ,
    totalAlbum ,
    premiumUser ,

    topSong

 })

});

exports.incrementPlayCount = async (req, res) => {
  try {
    await Song.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { playCount: 1 },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


