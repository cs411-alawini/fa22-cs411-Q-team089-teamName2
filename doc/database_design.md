CREATE TABLE User (
    userId INT,
    passwords VARCHAR(255),
    names VARCHAR(255),
    completionRate FLOAT,
    PRIMARY KEY (userId)
);

CREATE TABLE Checklist (
    checkListId INT,
    names VARCHAR(255),
    userId INT,
    PRIMARY KEY (checkListId),
    FOREIGN KEY (userId) REFERENCES User (userId)
);

CREATE TABLE FriendGroup (
    groupId INT,
    names VARCHAR(255),
    PRIMARY KEY (groupId)
);

CREATE TABLE Alert (
    alertId INT,
    messages VARCHAR(255),
    pingedUserId INT,
    FOREIGN KEY (pingedUserId) REFERENCES User (userId)
);

CREATE TABLE Tasks(
    taskId INT PRIMARY KEY,
    checkListId INT,
    dateCompleted DATE,
    taskContent VARCHAR(255),
    FOREIGN KEY (checkListId) REFERENCES Checklist (checkListId)
);

CREATE TABLE Relationships(
    userId INT,
    groupId INT,
    PRIMARY KEY (userId, groupId),
    FOREIGN KEY (userId) REFERENCES User (userId),
    FOREIGN KEY (groupId) REFERENCES FriendGroup (groupId)
);