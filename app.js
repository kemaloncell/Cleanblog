const express = require('express');
const app = express();
const ejs = require('ejs');

//Template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server port ${port} started`);
});
