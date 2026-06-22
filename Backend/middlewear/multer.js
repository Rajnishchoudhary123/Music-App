const multer = require('multer');

const storage = multer.memoryStorage();

const uploadFile = multer({storage}).fields([

    {name : "file" , maxCount : 1} ,
    { name : "thumbnail", maxCount : 1  }

])

module.exports = uploadFile;