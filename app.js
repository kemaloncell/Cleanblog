const express = require('express');
const Posts = require('./models/Posts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//*Routes
app.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    posts,
  });
});
app.get('/post/:id', async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.render('post', {
    post,
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

app.get('/posts/edit/:id', async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  res.render('edit_post', {
    post,
  });
});

app.put('/posts/:id', async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/post/${req.params.id}`);
});

app.delete('/posts/:id', async (req, res) => {
  await Posts.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
