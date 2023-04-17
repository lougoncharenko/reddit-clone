// Require Libraries
const express = require("express");
const app = express();
const Post = require('./models/posts');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//command to start mongo db
// brew services restart mongodb-community

// Setup port
const PORT = process.env.PORT || 4000;

// Setup db
require('./data/reddit-db');

//Controllers
require('./controllers/posts')(app);
require('./controllers/cases')(app);

// Middleware
const handlebars =  require('express-handlebars');
const hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo() { return 'FOO!'; },
        bar() { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(PORT, () =>
  console.log(`Nodeddit app listening on port ${PORT}!`),
);
