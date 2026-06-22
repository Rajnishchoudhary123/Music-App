const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
    trim: true
},

description: {
    type: String,
    required: true,
    trim: true
},

thumbnail: {
    id: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    }
}

}, { timestamps: true });

module.exports = mongoose.model("Albums", albumSchema);
