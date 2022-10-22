CREATE TABLE IF NOT EXISTS User (
    userId INT,
    passwords VARCHAR(255),
    names VARCHAR(255),
    completionRate FLOAT,
    PRIMARY KEY (userId)
);


CREATE TABLE IF NOT EXISTS Checklist (
    checkListId INT,
    names VARCHAR(255),
    userId INT,
    PRIMARY KEY (checkListId),
    FOREIGN KEY (userId) REFERENCES User (userId)
);

CREATE TABLE IF NOT EXISTS FriendGroup (
    groupId INT,
    names VARCHAR(255),
    PRIMARY KEY (groupId)
);

CREATE TABLE IF NOT EXISTS Alert (
    alertId INT,
    messages VARCHAR(255),
    pingedUserId INT,
    FOREIGN KEY (pingedUserId) REFERENCES User (userId)
);

CREATE TABLE IF NOT EXISTS Tasks(
    taskId INT PRIMARY KEY,
    checkListId INT,
    dateCompleted DATE,
    taskContent VARCHAR(255),
    FOREIGN KEY (checkListId) REFERENCES Checklist (checkListId)
);

CREATE TABLE IF NOT EXISTS Relationships(
    userId INT,
    groupId INT,
    FOREIGN KEY (userId) REFERENCES User (userId),
    FOREIGN KEY (groupId) REFERENCES FriendGroup (groupId)
);