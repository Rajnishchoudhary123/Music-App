const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

id : {

    type : String

},
name: {
    type: String,
    required: true,
    trim: true
},

email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
},

password: {
    type: String,
    required: true
},

isPremium: {
    type: Boolean,
    default: false
},

stripeCustomerId: {
    type: String
},

stripeSubscriptionId: {
    type: String
},

role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
},

playlist: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Songs"
    }
]


}, { timestamps: true });

module.exports = mongoose.model("Musicuser", userSchema);
