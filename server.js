// Bring in all dependencies
const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const path = require('path');

// for handling routes
const bodyParser = require('body-parser');

// Bring in routes from the api
const questions = require('./routes/api/questions');
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/users');

// Initialize express into the app variable
const app = express();

// Bodyparser has the piece of middleware we need
app.use(bodyParser.json());


//DB Config
const db = require('./config/keys').mongoURI;

//connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected ...'))
    .catch(err => console.log(err));

//Use routes / All requests going to the api/questions goes the questions variable at the top questions.js file
app.use('/api/questions', questions)
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

//Edit for deployment || serve static assets if in production
if (process.env.NODE_ENV === 'production') {

    //Set a static folder for frontend build
    app.use(express.static('client/build'));

    //anything coming will be redirected here
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    //Let's create a post build script in package.json
}

//port to run on: env when deployed and 4000 locally/heroku
const port = process.env.PORT || 4000;


//When server started listen the port
app.listen(port, () => console.log(`Server is running on port ${port}`));