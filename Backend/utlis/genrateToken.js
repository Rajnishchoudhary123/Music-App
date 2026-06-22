const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')

dotenv.config()

const genrateToken = (id , res)=>{

    const token = jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "15d"});

    res.cookie("token" , token, {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly: true ,

        sameSite : "strict"
    })
};

console.log(process.env.JWT_SECRET)

module.exports = genrateToken;