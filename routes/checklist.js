const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');
const e = require('express');

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

router.get('/loginLanding', function(req, res) {
  userId = req.query.username;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `SELECT checkListId, names FROM Checklist WHERE userId=${userId}`;
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



module.exports = router; 