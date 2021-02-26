const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    facebook:{
        type: String,
    },
    instagram:{
        type: String,
    },
    twitter:{
        type: String,
    },
    linkedin:{
        type: String,
    },
    google:{
        type: String,
    },
    
},
{
    timestamps: true,
});

const teacherModel = mongoose.model("Teacher" , teacherSchema);
module.exports = teacherModel;