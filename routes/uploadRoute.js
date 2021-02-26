const multer = require('multer');
const express = require('express');
const { isAuth } = require('../util');

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/pc-tech/public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ 
    storage ,
    limits:{
      fields: 1024*1024*2
    }
});

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/images/${req.file.filename}`);
});

module.exports = uploadRouter;