const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var root = '/groups';
var currMax;
var userId;

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    currMax = obj.groupId;
  }
});

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
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `
  SELECT r.groupId, fg.names 
  FROM Relationships r 
  JOIN FriendGroup fg ON r.groupId=fg.groupId 
  WHERE r.userId=${userId}`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("groups", {
      data: result,
      userId: userId
    })
  })
});

router.post('/createGroup', function(req, res) {
  var name = req.body.newGroup;
  currMax+=1

  var sql = `INSERT INTO FriendGroup (groupId, names) VALUES (${currMax},'${name}')`;
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
        obj.groupId = currMax;
        json = JSON.stringify(obj)
        fs.writeFile('./id.json', json, 'utf8', function(err) {
          if (err) res.send(err);
          return;
        });
      }
    });
    res.redirect(root + `/joinGroup?method=POST&groupId=${currMax}`);
  });
});

router.post('/joinGroup', function(req, res) {
  var groupId = req.body.groupId;
  var sql = `INSERT INTO Relationships (userId, groupId) VALUES (${userId},${groupId})`;
  console.log(sql);
  
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(root + '/');
  });
});

router.delete('/leaveGroup', function(req,res) {
  var groupId = req.query.groupId;
  
  var sql = `DELETE FROM Relationships WHERE userId=${userId} AND groupId=${groupId}`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(root+'/');
  })
});

module.exports = router; 