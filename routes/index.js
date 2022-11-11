const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

router.get('/signin', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
});

module.exports = router;
