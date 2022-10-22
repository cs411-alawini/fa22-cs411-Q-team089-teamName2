CREATE DATABASE IF NOT EXISTS teamName2;
USE teamName2;

DROP TABLE IF EXISTS User;
CREATE TABLE User (
    userId INT,
    passwords VARCHAR(255),
    names VARCHAR(255),
    completionRate FLOAT,
    PRIMARY KEY (userId)
);

DROP TABLE IF EXISTS Checklist;
CREATE TABLE Checklist (
    checkListId INT,
    names VARCHAR(255),
    userId INT,
    PRIMARY KEY (checkListId),
    FOREIGN KEY (userId) REFERENCES User (userId)
);

DROP TABLE IF EXISTS FriendGroup;
CREATE TABLE FriendGroup (
    groupId INT,
    names VARCHAR(255),
    PRIMARY KEY (groupId)
);

DROP TABLE IF EXISTS Alert;
CREATE TABLE Alert (
    alertId INT,
    messages VARCHAR(255),
    pingedUserId INT,
    FOREIGN KEY (pingedUserId) REFERENCES User (userId)
);

DROP TABLE IF EXISTS Tasks;
CREATE TABLE Tasks(
    taskId INT PRIMARY KEY,
    checkListId INT,
    dateCompleted DATE,
    taskContent VARCHAR(255),
    FOREIGN KEY (checkListId) REFERENCES Checklist (checkListId)
);

DROP TABLE IF EXISTS Relationships;
CREATE TABLE Relationships(
    userId INT,
    groupId INT,
    PRIMARY KEY (userId, groupId),
    FOREIGN KEY (userId) REFERENCES User (userId),
    FOREIGN KEY (groupId) REFERENCES FriendGroup (groupId)
);

SELECT AVG(u.completionRate)
FROM User u 
JOIN Relationships r ON r.userId=u.userId
JOIN FriendGroup fg ON r.groupId=fg.groupId
WHERE fg.names LIKE "%group1%"
GROUP BY r.groupId
LIMIT 15;

SELECT COUNT(t.taskId), dateCompleted
FROM User u
JOIN Checklist c ON c.userId=u.userId
JOIN Tasks t ON t.checkListId=c.checkListId
JOIN Relationships r ON r.userId=u.userId
JOIN FriendGroup fg ON r.groupId=fg.groupId
WHERE fg.names LIKE "%group1%"
GROUP BY dateCompleted
ORDER BY COUNT(t.taskId) DESC
LIMIT 15;