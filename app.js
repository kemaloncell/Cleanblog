const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/PostController');
const pageController = require('./controllers/PageController');
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
app.get('/', postController.getAllPosts);
app.get('/post/:id', postController.getPost);
app.post('/posts', postController.CreatePost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/posts/edit/:id', pageController.getEditPostPage);

const port = 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
