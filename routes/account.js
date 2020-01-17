const express = require('express');
const router = express.Router();
const User = require('../models/user');

// router.get('/reg', (req, res) => {
//   res.send('Це сторінка реєстрації');
// });

router.post('/reg', (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: 'Користувача небуло добавлено'});
    } else {
      res.json({success: true, msg: 'Користувача було добавлено'})
    }
  })
});

router.get('/auth', (req, res) => {
  res.send('Це сторінка авторизації');
});

router.get('/dashborad', (req, res) => {
  res.send('Це кабінет користкувача');
});

module.exports = router;
