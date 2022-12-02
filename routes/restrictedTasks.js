const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var root = '/restrictedTasks';
data = {}
var currMax;

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    currMax = obj.alertId;
  }
});

router.use(function(req, res, next) {
  if (req.query.method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  } else if (req.query.method == "PUT") {
    req.method = 'PUT';
    req.url = req.path;
  } else if (req.query.method == "POST") {
    req.body.newAlert = req.query.newAlert;
    req.method = "POST";
    req.url = req.path;
  }
  next();
});

router.get('/landing', function(req, res) {
  data['userId'] = req.query.userId;
  data['friendId'] = req.query.friendId;
  data['groupId'] = req.query.groupId;
  data['groupName'] = req.query.groupName;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `
  SELECT t.taskId, t.taskContent
  FROM Tasks t JOIN Checklist c ON t.checkListId=c.checkListId
  WHERE c.userId=${data['friendId']} AND t.dateCompleted IS NULL`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("restrictedTasks", {
      data: result,
      userId: data["userId"],
      friendId: data["friendId"],
      groupId: data["groupId"],
      groupName: data["groupName"]
    })
  })
});

router.post('/createAlert', function(req, res) {
  var message = req.body.newAlert;
  var taskId = req.query.taskId;
  currMax += 1;

  var sql = `
  INSERT INTO Alert VALUES (${currMax}, "${message}", ${taskId})`;
  console.log(sql);
  
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    fs.readFile('./id.json', 'utf8', function(err, data) {
      if (err) {
        res.send(err);
        return;
      } else {
        obj = JSON.parse(data);
        obj.alertId = currMax;
        json = JSON.stringify(obj)
        fs.writeFile('./id.json', json, 'utf8', function(err) {
          if (err) res.send(err);
          return;
        });
      }
    });
    res.redirect(root + '/');
  });
});

module.exports = router; 