# Relational Schema from ER

## Relations based on Entities
User(username:VARCHAR(255) [PK], password:VARCHAR(255), name:VARCHAR(255), completionRate:FLOAT)

Checklist(checkListId:INT [PK], name:VARCHAR(255), username:VARCHAR(255) [FK to User.username])

FriendGroup(groupId:INT [PK], name: VARCHAR(255))

Alert(alertId:INT [PK], Message: VARCHAR(255), pingedUser:VARCHAR(255) [FK to User.username])

Task(taskId:INT [PK], checklistID:INT [FK to Checklist.checklistId], dateCompleted:DATE, taskContent:VARCHAR(255))

## Relations based on many-to-many relations
Relationship(username:VARCHAR(255) [FK to user.username], groupId:INT [FK to FriendGroup.groupId], name:VARCHAR(255))