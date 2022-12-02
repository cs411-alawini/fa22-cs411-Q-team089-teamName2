const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  var userId = req.body.userId
  var password = req.body.password

  var sql = `
  SELECT userId, passwords FROM User WHERE userId=${userId}`;
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    if (result.length>0 && result[0].passwords == password) {
      res.redirect(`/checklist/landing?userId=${userId}`);
    } else {
      res.render('index', {success: false});
    }
  });
});

module.exports = router;
