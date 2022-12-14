const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js");
const fs = require('fs');

var root = '/checklist';
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

router.use(function(req, res, next) {
  if (req.query.method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

router.get('/landing', function(req, res) {
  userId = req.query.userId;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `SELECT checkListId, names FROM Checklist WHERE userId=${userId} ORDER BY checkListId`;
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(result);
    res.render("checklist", {
      data: result,
      userId: userId
    })
  })
});

router.post('/createChecklist', function(req, res) {
  var name = req.body.newChecklist;
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

router.delete('/deleteChecklist', function(req,res) {
  var checklistId = req.query.checklistId;
  
  var sql = `CALL deleteCheckList(${userId}, ${checklistId})`;
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