const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));
  // SIGN UP POST ACTION
  app.post('/sign-up', async (req, res) => {
    try {
      // Create User
      const user = await new User(req.body);
      const savedUser = await user.save();
      const token = await jwt.sign(
        { _id: user._id }, 
        process.env.SECRET, 
        { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.redirect('/');
    } catch(err) {
      console.log(err.message);
      return res.status(400).send({ err });
    }
  });
  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
  });
  // LOGIN FORM
  app.get('/login', (req, res) => res.render('login'));
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }, 'username password');
      if (!user) {
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong Username or password' });
        }
        if (req.body.rememberMe) {
          const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: '2 days',
          });
          res.cookie('nToken', token, { maxAge: 172800000, httpOnly: true });
        } else {
          const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET);
          res.cookie('nToken', token, { httpOnly: true }); //JWT token should expire when browser window is closed
        }
        return res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  });
};