DELIMITER //
CREATE PROCEDURE updateTaskStatus(
  IN userId INT,
  IN completed INT,
  IN taskId INT
)
  BEGIN
    DECLARE numCompleted INT DEFAULT 0;
    DECLARE completionRate FLOAT DEFAULT 0;
    DECLARE newAvg FLOAT DEFAULT 0;

    SELECT COUNT(t.taskId), u.completionRate
    INTO numCompleted, completionRate
    FROM User u
    JOIN Checklist c ON c.userId=u.userId
    JOIN Tasks t ON t.checkListId=c.checkListId
    WHERE u.userId=userId AND t.dateCompleted IS NOT NULL
    GROUP BY u.userId;

    IF completed = 1 THEN
      SET newAvg = numCompleted/(((numCompleted-1)/completionRate)+1);
      UPDATE Tasks t SET dateCompleted=GETDATE() WHERE t.taskId=taskId;
    ELSE
      SET newAvg = numCompleted/(((numCompleted)/completionRate)+1);
      DELETE FROM Tasks t WHERE t.taskId=taskId;
    END IF;

    UPDATE User u SET u.completionRate=newAvg WHERE u.userId=userId;

  END //
DELIMITER ;