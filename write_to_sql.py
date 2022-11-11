import pandas as pd
import mysql.connector


password = "" #put local password here
data = pd.read_csv (r'generatedData/alertTable.csv')   
df = pd.DataFrame(data)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password= password
)

cursor = mydb.cursor()

cursor.execute("USE teamName2;")
mydb.commit()

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