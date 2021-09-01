const express = require('express');
const Post = require('./models/Post');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//*Template engine
app.set('view engine', 'ejs');

//*Middlewares
app.use(express.static('public'));

//*Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/post', (req, res) => {
  console.log(req.body);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
