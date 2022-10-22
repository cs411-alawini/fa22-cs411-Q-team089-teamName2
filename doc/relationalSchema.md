# Relational Schema from ER

## Relations based on Entities
User(username:VARCHAR(255) [PK], password:VARCHAR(255), name:VARCHAR(255), completionRate:FLOAT)

Assumptions for User: The Primary key is the username as login should be unique for each person. The other variables are profile info that can overlap, so they do not need to be unique.

Checklist(checkListId:INT [PK], name:VARCHAR(255), username:VARCHAR(255) [FK to User.username])

Assumptions for Checklist: The checkListId is a unique integer identifying that checklist. Thus, it is the primary key. The username is the Foreign key because it relates the Checklist to its user.

FriendGroup(groupId:INT [PK], name: VARCHAR(255))

Assumptions for FriendGroup: groupId is a unique integer identifying that FriendGroup. Thus, it is the primary key. The name can overlap between groups.

Alert(alertId:INT [PK], Message: VARCHAR(255), pingedUser:VARCHAR(255) [FK to User.username])

Assumptions for Alert: alertId is a unique integer identifying that FriendGroup. Thus, it is the primary key. The pingedUser is a foreign key identifying which user is being pinged.

Task(taskId:INT [PK], checklistID:INT [PK] [FK to Checklist.checklistId], dateCompleted:DATE, taskContent:VARCHAR(255))

Assumptions for Task: taskId is a unique integer identifying that FriendGroup. Thus, it is the primary key. Because it is weak, the checklistId which the task is tied to is also a primary key. 

## Relations based on many-to-many relations
Relationship(username:VARCHAR(255) [PK] [FK to user.username], groupId:INT [PK] [FK to FriendGroup.groupId])

Assumptions for relationships: username and groupId both relate one user to one group. Thus, each pair is a foreign key to their respective tables and they both are Primary Keys as the combination is unique to the table.