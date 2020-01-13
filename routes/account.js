const express = require('express');
const router = express.Router();

router.get('/reg', (req, res) => {
  res.send('Це сторінка реєстрації');
});

router.get('/auth', (req, res) => {
  res.send('Це сторінка авторизації');
});

router.get('/dashborad', (req, res) => {
  res.send('Це кабінет користкувача');
});

module.exports = router;
