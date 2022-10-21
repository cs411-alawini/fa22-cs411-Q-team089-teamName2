-- (username:VARCHAR(255) [PK], password:VARCHAR(255), name:VARCHAR(255), completionRate:FLOAT)
CREATE TABLE User IF NOT EXIST(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    name VARCHAR(255),
    completionRate FLOAT
);

-- Checklist(checkListId:INT [PK], name:VARCHAR(255), username:VARCHAR(255) [FK to User.username])
CREATE Checklist IF NOT EXIST(
    checkListId INT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    FOREIGN KEY TO User.username
);

-- FriendGroup(groupId:INT [PK], name: VARCHAR(255))
CREATE FriendGroup IF NOT EXIST(
    groupId INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Alert(alertId:INT [PK], Message: VARCHAR(255), pingedUser:VARCHAR(255) [FK to User.username])
CREATE Alert IF NOT EXIST(
    alertId INT,
    message VARCHAR(255),
    pingedUser VARCHAR(255),
    FOREIGN KEY TO User.username
);

-- Task(taskId:INT [PK], checklistID:INT [FK to Checklist.checklistId], dateCompleted:DATE, taskContent:VARCHAR(255))
CREATE Task IF NOT EXIST(
    taskId INT PRIMARY KEY,
    checkListId INT,
    dateCompleted DATE,
    taskContent VARCHAR(255),
    FOREIGN KEY TO Checklist.checklistId
);