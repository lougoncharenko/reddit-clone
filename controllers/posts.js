module.exports = (app) => {
    // CREATE

    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });
    
    app.post('/posts/new', (req, res) => {
      console.log(req.body);
    });
  };

