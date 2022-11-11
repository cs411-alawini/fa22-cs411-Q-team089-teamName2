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
  }
  next();
});

router.get('/groupsLanding', function(req, res) {
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

  var sql = `INSERT INTO Checklist (checkListId, names, userId) VALUES ('${currMax}','${name}','${userId}')`;
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
        obj.checkListId = currMax;
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

router.post('/joinGroup', function(req, res) {
  var groupId = req.body.groupId;
  currMax+=1

  var sql = `INSERT INTO Relationships (userId, groupId) VALUES (${userId},${groupId})`;
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
        obj.checkListId = currMax;
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

router.delete('/deleteChecklist', function(req,res) {
  var checklistId = req.query.checklistId;
  
  var sql = `DELETE FROM Checklist WHERE checkListId=${checklistId}`;
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