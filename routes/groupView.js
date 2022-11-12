const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")

var root = '/groupView';
var userId;
var groupId;
var groupName;

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

router.get('/mostProdDay', function(req, res) {
  var sql = `
  SELECT COUNT(t.taskId), dateCompleted
  FROM User u
  JOIN Checklist c on c.userId=u.userId
  JOIN Tasks t ON t.checkListId=c.checkListId
  JOIN Relationships r ON r.userId=u.userId
  JOIN FriendGroup fg ON r.groupId=fg.groupId
  WHERE fg.groupId LIKE ${groupId}
  GROUP BY dateCompleted
  ORDER BY COUNT(t.taskId) DESC
  LIMIT 1`;

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      console.log(err);
      return;
    }
    res.send({mostProdDay: result[0].dateCompleted});
  });
});

module.exports = router; 