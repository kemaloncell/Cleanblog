const express = require('express');
const Posts = require('./models/Posts');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Schema = mongoose.Schema;
const app = express();

//* Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//*Template engine
app.set('view engine', 'ejs');

//*Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*Routes
app.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    posts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Posts.create(req.body);
  res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
