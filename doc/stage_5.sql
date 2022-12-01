DELIMITER //
CREATE PROCEDURE updateTaskStatus(
  IN userId INT,
  IN completed INT,
  IN taskId INT
)
  BEGIN
    DECLARE numCompleted INT DEFAULT 0;
    DECLARE numAbandoned INT DEFAULT 0;
    DECLARE newAvg FLOAT DEFAULT 0;
    DECLARE archiveId INT DEFAULT 0;

    IF completed = 1 THEN
      UPDATE Tasks t SET dateCompleted = CURRENT_DATE WHERE t.taskId=taskId;
    ELSE
      UPDATE Tasks t SET dateCompleted = '1900-01-01' WHERE t.taskId=taskId;
    END IF;

    SELECT COUNT(t.taskId) INTO numCompleted
    FROM User u
    JOIN Checklist c ON c.userId=u.userId
    JOIN Tasks t ON t.checkListId=c.checkListId
    WHERE u.userId=userId AND t.dateCompleted IS NOT NULL AND t.dateCompleted!='1900-01-01'
    GROUP BY u.userId;

    SELECT COUNT(t.taskId) INTO numAbandoned
    FROM User u
    JOIN Checklist c ON c.userId=u.userId
    JOIN Tasks t ON t.checkListId=c.checkListId
    WHERE u.userId=userId AND t.dateCompleted IS NOT NULL AND t.dateCompleted='1900-01-01'
    GROUP BY u.userId;

    SELECT c.checkListId INTO archiveId
    FROM Checklist c
    JOIN User u ON u.userId=userId
    ORDER BY c.checkListId LIMIT 1;

    SET newAvg = (numCompleted)/(numCompleted+numAbandoned);
    UPDATE User u SET u.completionRate=newAvg WHERE u.userId=userId;
    UPDATE Tasks t SET t.checkListId=archiveId WHERE t.taskId=taskId;
    DELETE FROM Alert WHERE pingedTaskId=taskId;

  END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteCheckList(
  IN userId INT,
  IN checkListId INT
)
  BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE currTask INT;
    DECLARE numAlert INT DEFAULT 0;

    DECLARE taskCur CURSOR FOR
    SELECT taskId FROM Tasks t
    WHERE t.checkListId = checkListId AND dateCompleted IS NULL;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN taskCur;

    REPEAT
      FETCH taskCur INTO currTask;
      CALL updateTaskStatus(userId, 0, currTask);
    UNTIL done
    END REPEAT;
    CLOSE taskCur;

    DELETE FROM Checklist c WHERE c.checkListId=checkListId;
  END //
DELIMITER ;