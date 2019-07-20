const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const passport = require('passport');
const app= express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

const users = require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());


//DB config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);



// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on the port ${port}`));