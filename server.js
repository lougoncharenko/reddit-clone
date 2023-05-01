// Require Libraries
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const handlebars =  require('express-handlebars');


const app = express();
app.use(express.static('public'));

// Setup db
require('./data/reddit-db');

// Middleware
const hbs = handlebars.create({
  helpers: {}
});
const checkAuth = require('./middleware/checkAuth');


//App config
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(checkAuth);
app.use(express.static('public'));

//command to start mongo db
// brew services restart mongodb-community

// Setup port
const PORT = process.env.PORT || 4000;

//Controllers
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

const Post = require('./models/posts');
// Routes
app.get('/', async (req, res) => {
  const { user } = req;
  console.log(req.cookies);
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts, user  });
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(PORT, () =>
  console.log(`Nodeddit app listening on port ${PORT}!`),
);

module.exports = app;