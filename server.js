// Require Libraries
const express = require("express");
const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () =>
  console.log(`Nodeddit app listening on port ${PORT}!`),
);
