const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var root = '/profile';
data = {}

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    data['currMax'] = obj.checkListId;
  }
});

router.get('/profileLanding', function(req, res) {
  data['userId'] = req.query.userId;
  var sql = `
  SELECT * FROM User WHERE userId=${data['userId']}`;
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    data['names']=result[0].names;
    data['completionRate']=result[0].completionRate;
    res.redirect(root+'/');
  });
});

router.get('/', function(req, res) {
  var sql = `
  SELECT a.messages, c.checkListId
  FROM Checklist c
  JOIN Tasks t ON c.checkListId=t.checkListId
  JOIN Alert a ON t.taskId=a.pingedTaskId
  WHERE c.userId=${data['userId']}`
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("profile", {
      userId: data['userId'],
      names: data['names'],
      completionRate: data['completionRate'],
      data: result
    });
  })
});

module.exports = router; 