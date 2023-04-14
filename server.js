// Require Libraries
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

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
app.get('/', (req, res) => {
    res.render('home');
});

// New Route
app.get('/cases/new', (req, res) => {
    res.render('cases-new', {});
});

// Create Route
app.post('cases/create', (req, res) => {
    console.log("OH ho")

    res.redirect('/cases/${caseid}');
});

// Show Route
app.get('/cases/:id', (req, res) => {
    res.render()
})

app.listen(PORT, () =>
  console.log(`Nodeddit app listening on port ${PORT}!`),
);
