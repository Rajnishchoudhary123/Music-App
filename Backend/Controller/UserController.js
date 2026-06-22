
const TryCatch = require('../utlis/tryCatch.js')

const User = require('../models/user.js')

const bcrypt = require('bcrypt');

const genrateToken = require('../utlis/genrateToken.js')

exports.registerUser = TryCatch(async(req , res)=>{

    const{name , email , password}= req.body 

    let user = await  User.findOne({email})
     
    if(user)

        return res.status(404).json({

            message : "User Already Exists"

        })

        const hasedPassword = await bcrypt.hash(password , 10 )

        user = await User.create({

            name ,

            email ,

            password : hasedPassword
        })

        genrateToken(user._id  , res)

        res.status(201).json({

            user ,

            message : "user Registered"
        })
});

exports.loginUser = TryCatch(async(req , res)=>{

    const{email , password}= req.body 

    const user = await  User.findOne({email})
     
    if(!user)

        return res.status(404).json({

            message : "user not found"
        })

        const match = await bcrypt.compare(password , user.password )

        if(!match)

             return res.status(404).json({

            message : "Wrong Password"
        }) 


        genrateToken(user._id  , res)

        res.status(200).json({

            user ,

            message : "user Loggedin"
        })
});

exports.getAllUsers = TryCatch(async(req , res)=>{

const users = await User.find();

res.json(users)


})

exports.myProfile = TryCatch(async(req,res)=>{

const user = await User.findById(req.user._id);

res.json(user)

});

exports.logoutUser = TryCatch(async(req , res)=>{

res.cookie("token" , "", {
    maxAge : 0
})

res.json({

    message : "logged Out successfully"

})

});

exports.saveToPlayList = TryCatch(async (req, res) => {

const user = await User.findById(req.user._id);

const songId = req.params.id;

const exists = user.playlist.some(
    id => id.toString() === songId
);

if (exists) {

    user.playlist = user.playlist.filter(
        id => id.toString() !== songId
    );

    await user.save();

    return res.json({
        message: "Removed from playlist"
    });
}

user.playlist.push(songId);

await user.save();

res.json({
    message: "Added to playlist"
});

});
exports.deleteUser = async (req, res) => {
  try {
    console.log("ID RECEIVED:", req.params.id);

    const user = await User.findById(req.params.id);

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    console.log("USER DELETED");

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
