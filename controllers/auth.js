const User = require('../models/user');

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => res.render('sign-up'));

    app.post('/sign-up', (req, res) => {
        // Create User
        const user = new User(req.body);
    
        user
          .save()
          .then(() => res.redirect('/'))
          .catch((err) => {
            console.log(err.message);
          });
      });
    };
