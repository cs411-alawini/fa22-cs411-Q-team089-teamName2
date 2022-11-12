const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

var root = '/groupView';
var userId;
var groupId;
var groupName;

router.use(function(req, res, next) {
  if (req.query.method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  } else if (req.query.method == 'POST') {
    req.method = "POST";
    req.body.groupId = req.query.groupId;
    req.url = req.path;
  }
  next();
});

router.get('/landing', function(req, res) {
  userId = req.query.userId;
  groupId = req.query.groupId;
  groupName = req.query.groupName;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `
  SELECT u.userId, u.names
  FROM User u
  JOIN Relationships r ON r.userId=u.userId
  WHERE r.groupId=${groupId} AND NOT u.userId=${userId}`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("groupView", {
      data: result,
      userId: userId,
      groupId: groupId,
      groupName: groupName
    })
  })
});

router.get('/avgCompRate', function(req, res) {
  var sql = `
  SELECT AVG(u.completionRate) as avgCompRate
  FROM User u
  JOIN Relationships r ON r.userId=u.userId
  JOIN FriendGroup fg ON r.groupId=fg.groupId
  WHERE fg.groupId LIKE ${groupId}
  GROUP BY r.groupId`;
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      console.log(err);
      return;
    }
    res.send({avgCompRate: result[0].avgCompRate});
    return;
  })
});

module.exports = router; 