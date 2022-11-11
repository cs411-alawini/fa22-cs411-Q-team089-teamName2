const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/signin', function(req, res) {
  var username = req.body.username
  var password = req.body.password

  req.query.username = username
  res.redirect('/checklist/loginLanding?username='+req.query.username);
  return;
});

module.exports = router;
