const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true,
  },
  image:{
    type: String,
    required: true,
  },
  hour:{
      type: Number,
      default: 0,
      required: true,
  },
  day:{
      type: String,
      required: true,
  },
  description:{
      type: String,
      required: true,
  },
  teacher:{
      type: String,
      required: true,
  },
},
{
    timestamps: true,
});

const courseModel = mongoose.model("Course" , courseSchema);
module.exports = courseModel;