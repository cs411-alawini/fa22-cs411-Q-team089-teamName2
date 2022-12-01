const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../database.js")
const fs = require('fs');

var root = '/tasks';
data = {}

fs.readFile('./id.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    currMax = obj.taskId;
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
    req.body.newTask = req.query.newTask;
    req.method = "POST";
    req.url = req.path;
  }
  next();
});

router.get('/landing', function(req, res) {
  data['userId'] = req.query.userId;
  data['checklistId'] = req.query.checklistId;
  res.redirect(root+'/');
});

router.get('/', function(req, res) {
  var sql = `
  SELECT taskId, taskContent
  FROM Tasks  
  WHERE checkListId=${data['checklistId']}`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render("tasks", {
      data: result,
      userId: data["userId"],
      checklistId: data["checklistId"]
    })
  })
});

router.post('/createTask', function(req, res) {
  var taskContent = req.body.newTask;
  currMax+=1;

  var sql = `INSERT INTO Tasks (taskId, checkListId, dateCompleted, taskContent)
  VALUES ('${currMax}','${data["checklistId"]}',NULL,'${taskContent}')`;
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
        obj.taskId = currMax;
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

router.put('/completeTask', function(req, res) {
  var taskId = req.query.taskId;

  var sql = `CALL updateTaskStatus(${data["userId"]}, 1, ${taskId})`;
  console.log(sql);
  
  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(root + `/`);
  });
});

router.delete('/abandonTask', function(req, res) {
  var taskId = req.query.taskId;

  var sql = `CALL updateTaskStatus(${data["userId"]}, 0, ${taskId})`;
  console.log(sql);

  db.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(root+ `/`);
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
  
  var sql = `DELETE FROM Relationships WHERE groupId=${groupId}`;
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