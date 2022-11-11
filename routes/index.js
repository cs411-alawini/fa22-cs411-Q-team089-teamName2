const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

router.get('/mark', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
