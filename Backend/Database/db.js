const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const connectDB = async()=>{

    try{

      await  mongoose.connect(process.env.MONGODB_URL , {

            dbName : "MUSICDATA"

        }) 

        console.log("mongodb is connected")

    }catch(error){

        console.log(error)

    }

}

console.log(process.env.MONGODB_URL)

module.exports = connectDB;