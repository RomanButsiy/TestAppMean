const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

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
  User.getUserByLogin(newUser.login, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({success: false, msg: 'Користувач з таким логіном вже зареєстрований'});
    } else {
      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({success: false, msg: 'Користувача не було добавлено'});
        } else {
          res.json({success: true, msg: 'Користувача було добавлено'});
        }
      });
    }
  });
});

router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  User.getUserByLogin(login, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'Користувача не було знайдено'});
    }
    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), db.secret, {
          expiresIn: 3600 * 24
        });
        res.json({
          success: true,
          msg: 'Ви успішно авторизувалися',
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Паролі не співпадають'});
      }
    });
  });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send('Це кабінет користкувача');
});

module.exports = router;
