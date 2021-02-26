const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        max: 225,
        min: 6,
        unique: true,
        dropDups: true
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    comment:{
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true,
});

const userModel = mongoose.model("User" , userSchema);
module.exports = userModel;