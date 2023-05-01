const Post = require('../models/posts');

module.exports = (app) => {
    // CREATE
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });
    // CREATE
    app.post('/posts/new', (req, res) => {
      if (req.user) {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
  
        post
          .save()
          .then(() => User.findById(userId))
          .then((user) => {
            user.posts.unshift(post);
            user.save();
            // REDIRECT TO THE NEW POST
            return res.redirect(`/posts/${post._id}`);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        return res.status(401); // UNAUTHORIZED
      }
    });
    // SHOW
  app.get('/posts/:id', (req, res) => {
    const currentUser = req.user;
    Post.findById(req.params.id).populate('comments').lean()
      .then((post) => res.render('posts-show', { post, currentUser }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    const { user } = req;
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts, user }))
      .catch((err) => {
        console.log(err);
      });
  });
  };



