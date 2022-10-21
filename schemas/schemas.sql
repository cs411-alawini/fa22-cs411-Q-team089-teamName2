CREATE DATABASE IF NOT EXISTS cs411;
USE cs411;


CREATE TABLE IF NOT EXISTS User (
    username VARCHAR(255),
    passwords VARCHAR(255),
    names VARCHAR(255),
    completionRate FLOAT,
    PRIMARY KEY (username),
);


-- CREATE TABLE IF NOT EXISTS Checklist (
--     checkListId INT,
--     names VARCHAR(255),
--     username VARCHAR(255),
--     FOREIGN KEY TO User.username,
--     PRIMARY KEY (checkListId)
-- );

-- CREATE TABLE IF NOT EXISTS FriendGroup (
--     groupId INT,
--     names VARCHAR(255),
--     PRIMARY KEY (groupId)
-- );

-- CREATE TABLE IF NOT EXISTS Alert (
--     alertId INT,
--     messages VARCHAR(255),
--     pingedUser VARCHAR(255),
--     FOREIGN KEY TO User.username
-- );

-- CREATE TABLE IF NOT EXISTS Tasks(
--     taskId INT PRIMARY KEY,
--     checkListId INT,
--     dateCompleted DATE,
--     taskContent VARCHAR(255),
--     FOREIGN KEY TO Checklist.checklistId,
--     PRIMARY KEY (taskId)
-- );