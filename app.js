const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/PostController');
const pageController = require('./controllers/PageController');
const app = express();

//* Connect DB
mongoose
  .connect(
    'mongodb://blog:r5wB3zMrhjrop5NV@cluster1-shard-00-00.ljm19.mongodb.net:27017,cluster1-shard-00-01.ljm19.mongodb.net:27017,cluster1-shard-00-02.ljm19.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-91ci0m-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED !!');
  })
  .catch((err) => {
    console.log(err);
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
