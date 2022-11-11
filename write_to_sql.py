import pandas as pd
import mysql.connector


password = "" #put local password here
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password= password
)

cursor = mydb.cursor()

cursor.execute("USE teamName2;")
mydb.commit()


def populateUsers():
  data = pd.read_csv (r'generatedData/userTable.csv')   
  df = pd.DataFrame(data)

  for row in df.itertuples():
      #print(row.alertId)
      print(row)
      # print(row.pingedUserId)
      # print(row.)
      sql = "INSERT INTO User (UserId, passwords, names, completionRate) VALUES (%s, %s, %s, %s)"
      val = (row.UserId, row._2, row._3, row._4)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)



def populateAlert():
  data = pd.read_csv (r'generatedData/alertTable.csv')   
  df = pd.DataFrame(data)
  
  for row in df.itertuples():
      # print(row.alertId)
      # print(row.)
      # print(row.pingedUserId)
      # print(row.)
      sql = "INSERT INTO Alert (alertId, messages, pingedUserId) VALUES (%s, %s, %s)"
      val = (row.alertId, row._2, row._3)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)
def populateCheckList():
  data = pd.read_csv (r'generatedData/checkListTable.csv')   
  df = pd.DataFrame(data)
  
  for row in df.itertuples():
      # print(row.alertId)
      # print(row.)
      # print(row.pingedUserId)
      # print(row)
      sql = "INSERT INTO Checklist (checkListId, names, userId) VALUES (%s, %s, %s)"
      val = (row.checkListId, row._2, row._3)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)

def populatefriendGroup():
  data = pd.read_csv (r'generatedData/friendGroupTable.csv')   
  df = pd.DataFrame(data)
  
  for row in df.itertuples():
      # print(row.alertId)
      # print(row.)
      # print(row.pingedUserId)
      # print(row)
      sql = "INSERT INTO FriendGroup (groupId, names) VALUES (%s, %s)"
      val = (row.groupId, row._2)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)
def populateTasks():
  data = pd.read_csv (r'generatedData/taskTable.csv')   
  df = pd.DataFrame(data)
  
  for row in df.itertuples():
      # print(row.alertId)
      # print(row.)
      # print(row.pingedUserId)
      # print(row)
      sql = "INSERT INTO Tasks (taskId, checkListId, dateCompleted, taskContent) VALUES (%s, %s, %s, %s)"
      val = (row.taskId, row._2, row._3, row._4)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)
def populateRelationships():
  data = pd.read_csv (r'generatedData/relationshipTable.csv')   
  df = pd.DataFrame(data)
  
  for row in df.itertuples():
      # print(row.alertId)
      # print(row.)
      # print(row.pingedUserId)
      # print(row)
      sql = "INSERT INTO Relationships (userId, groupId) VALUES (%s, %s)"
      val = (row.userId, row._2)
      cursor.execute(sql, val)
      mydb.commit()
  print(df)
populateRelationships()