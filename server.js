const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 7000;

//Import Routes
const userRouter = require('./routes/userRoute');
const courseRouter = require('./routes/courseRoute');
const teacherRouter = require('./routes/teacherRoute');
const uploadRouter = require('./routes/uploadRoute.js');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;

mongoose.connect( mongodbUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {console.log("Connected to DB");});

app.use(bodyParser.json());

//Routes middleware
app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/teachers", teacherRouter);

app.use(cors);

/*const __dirname = path.resolve(); */
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) => {
    res.send('Server is ready');
  });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server started at  http://localhost:${port}...`);
});