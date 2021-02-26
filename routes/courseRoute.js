const express = require('express');
const  expressAsyncHandler = require('express-async-handler');
const Course = require('../model/coursesModel');
const { isAuth, isAdmin } = require('../util');

const courseRouter = express.Router();

courseRouter.get('/', expressAsyncHandler(async (req, res) => {
  const courses = await Course.find({}); 
  res.send(courses);
}));

courseRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if(course){
    res.send(course);
  } else{
    res.status(404).send({message: "course Not found."})
  }
}));

courseRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const course = new Course({
      name: 'sample name ' + Date.now(),
      image: '/images/courses-image1.jpg',
      hour: 0,
      day: 'sample day',
      teacher: "sample teacher",
      description: 'sample description',
    });
    const createdCourse = await course.save();
    res.send({ message: 'Course Created', course: createdCourse });
  })
);

  courseRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const course = await Course.findById(req.params.id);
      if (course) {
        const deleteCourse = await course.remove();
        res.send({ message: 'Course Deleted', course: deleteCourse });
      } else {
        res.status(404).send({ message: 'Course Not Found' });
      }
    })
  );
  

  courseRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);
      if (course) {
        course.name = req.body.name;
        course.day= req.body.day;
        course.hour=req.body.hour
        course.image = req.body.image;
        course.teacher = req.body.teacher;
        course.description = req.body.description;
        const updatedCourse = await course.save();
        res.send({ message: 'Course Updated', course: updatedCourse });
      } else {
        res.status(404).send({ message: 'Course Not Found' });
      }
    })
  );
    

module.exports = courseRouter;