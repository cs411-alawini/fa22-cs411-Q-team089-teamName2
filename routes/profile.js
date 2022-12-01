const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var root = '/profile';
var currMax;
var userId;

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    currMax = obj.checkListId;
  }
});

router.get('/profileLanding', function(req, res) {
  userId = req.query.userId;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `
  SELECT u.names, a.messages, c.checkListId
  FROM User u
  JOIN Checklist c ON u.userId=c.userId
  JOIN Tasks t ON c.checkListId=t.checkListId
  JOIN Alert a ON t.taskId=a.pingedTaskId
  WHERE u.userId=${userId}`
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("profile", {
      userId: userId,
      data: result
    });
  })
});

module.exports = router; 