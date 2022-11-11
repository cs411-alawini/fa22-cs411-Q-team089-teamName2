const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

router.get('/', function(req, res) {
  var username = req.query.username;
  
  var sql = `SELECT checkListId, names FROM Checklist WHERE userId=${username}`;
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("checklist", {
      data: result
    })
  })
});

module.exports = router; 