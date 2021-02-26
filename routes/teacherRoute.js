const express = require('express');
const  expressAsyncHandler = require('express-async-handler');
const Teacher = require('../model/teacherModel');
const { isAuth, isAdmin } = require('../util');

const teacherRouter = express.Router();

teacherRouter.get('/', expressAsyncHandler(async (req, res) => {
  const teachers = await Teacher.find({}); 
  res.send(teachers);
}));

teacherRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if(teacher){
    res.send(teacher);
  } else{
    res.status(404).send({message: "teacher Not found."})
  }
}));

teacherRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const teacher = new Teacher({
      name: 'sample name ' + Date.now(),
      image: '/images/author-image1.jpg',
      comment: 'sample comment',
      email: 'sample email',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      google: '',
    });
    const createdTeacher = await teacher.save();
    res.send({ message: 'Teacher Created', teacher: createdTeacher });
  })
);

  teacherRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const teacher = await Teacher.findById(req.params.id);
      if (teacher) {
        const deleteTeacher = await teacher.remove();
        res.send({ message: 'Teacher Deleted', teacher: deleteTeacher });
      } else {
        res.status(404).send({ message: 'Teacher Not Found' });
      }
    })
  );
  

  teacherRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const teacherId = req.params.id;
      const teacher = await Teacher.findById(teacherId);
      if (teacher) {
        teacher.name = req.body.name;
        teacher.image = req.body.image;
        teacher.comment = req.body.comment;
        teacher.email = req.body.email;
        teacher.facebook = req.body.facebook;
        teacher.instagram = req.body.instagram;
        teacher.twitter = req.body.twitter;
        teacher.linkedin = req.body.linkedin;
        teacher.google = req.body.google;
        const updatedTeacher = await teacher.save();
        res.send({ message: 'Teacher Updated', teacher: updatedTeacher });
      } else {
        res.status(404).send({ message: 'Teacher Not Found' });
      }
    })
  );
    

module.exports = teacherRouter;