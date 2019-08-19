const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const db = require('./config/keys').mongoURI;
const tasks = require('./routes/api/tasks');
const users = require('./routes/api/users');
const setupPassport = require('./config/passport');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const app = express();
app.use(passport.initialize());
setupPassport(passport);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('frontend', 'build', 'index.html'));
  });
}

app.use('/api/tasks', tasks);
app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
