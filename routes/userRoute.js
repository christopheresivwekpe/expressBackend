const express = require('express');
const  expressAsyncHandler = require('express-async-handler');
const { getToken, isAuth, isAdmin } = require('../util');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email
    });
    if(signinUser){
      res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser)
      });
    } 
        res.status(401).send({msg: 'Invalid Email or Password.'});
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
    })
    } else{
        res.status(401).send({msg: 'Invalid User Data.'});
    }
}));

/*
userRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const review = new User({
      rating: 0,
      review:" ",
    });
    const createdReview = await review.save();
    res.send({ message: 'Review Created', review: createdReview });
  })
);
*/

userRouter.get('/createadmin', async (req, res) =>{
    try{
    const user = new User({
        name: 'PC Tech',
        email: 'pctech@gmail.com',
        password: '1234567',
        isAdmin: true
    });
    
    const newUser = await user.save(); 
    res.send(newUser);
    }
    catch(err){
        res.send({msg: err.message});
    }
});

userRouter.get('/',
  isAuth,
  isAdmin, 
  expressAsyncHandler(async (req, res) => {
  const users = await User.find({}); 
  res.send(users);
}));

userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

  userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: getToken(updatedUser),
        });
      }
    })
  );
  
module.exports = userRouter;