const Post = require('../models/posts');

module.exports = (app) => {
    // CREATE
    // app.get('/posts/new', (req, res) => {
    //     res.render('posts-new');
    // });
    // CREATE
  app.post('/posts/new', (req, res) => {
    if (req.user) {
      const post = new Post(req.body);

      post.save(() => res.redirect('/'));
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
    
    app.post('/posts/new', (req, res) => {
      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);

      // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
      post.save(() => res.redirect('/'));
    });

    // LOOK UP THE POST
    app.get('/posts/:id', async (req, res) => { 
      try{
        const post = await Post.findById(req.params.id).lean().populate('comments');
        return res.render('posts-show', { post });
      }catch (err) {
        console.log(err.message);
      };
    });

    // SUBREDDIT
    app.get('/n/:subreddit', (req, res) => {
      Post.find({ subreddit: req.params.subreddit }).lean()
        .then((posts) => res.render('posts-index', { posts }))
        .catch((err) => {
          console.log(err);
        });
});
  };



