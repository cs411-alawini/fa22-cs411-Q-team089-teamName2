const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

router.get('/', function(req, res) {
  var username = req.query.username
  console.log(username)
  res.render('checklist');
});

module.exports = router; 