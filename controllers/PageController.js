const Posts = require('../models/Posts');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPostPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPostPage = async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  res.render('edit_post', {
    post,
  });
};
