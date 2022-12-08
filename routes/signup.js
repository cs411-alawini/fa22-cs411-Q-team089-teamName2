const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var currUserId;
var currChecklistId;

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    currUserId = obj.userId;
    currChecklistId = obj.checkListId;
  }
});

router.get('/', function(req, res) {
  currUserId+=1;
  currChecklistId+=1;
  res.render('signup', {userId: currUserId});
});

router.post('/createUser', function(req, res) {
  var name = req.body.name
  var password = req.body.password
  fs.readFile('./id.json', 'utf8', function(err, data) {
    if (err) {
      res.send(err);
      return;
    } else {
      obj = JSON.parse(data);
      obj.userId = currUserId;
      obj.checkListId = currChecklistId;
      json = JSON.stringify(obj)
      fs.writeFile('./id.json', json, 'utf8', function(err) {
        if (err) res.send(err);
        return;
      });
    }
  });

  var sql = `
  INSERT INTO User VALUES (${currUserId}, '${password}', '${name}', 1)`;
  console.log(sql);
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    sql = `
    INSERT INTO Checklist VALUES (${currChecklistId}, 'Archive', ${currUserId})`;

    db.query(sql, function(err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.redirect(`/checklist/landing?userId=${currUserId}`);
    });
  });
});

module.exports = router;
