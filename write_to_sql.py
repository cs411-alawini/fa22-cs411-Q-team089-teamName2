import pandas as pd
import mysql.connector


# password = ""
data = pd.read_csv (r'generatedData/alertTable.csv')   
df = pd.DataFrame(data)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password= password
)

cursor = mydb.cursor()

for row in df.itertuples():
    # print(row.alertId)
    # print(row.)
    # print(row.pingedUserId)
    # print(row.)
    sql = "INSERT INTO Alert (alertId, messages, pingedUserId) VALUES (%s, %s, %s)"
    val = (row.alertId, row._2, row._3)
    cursor.execute(sql, val)
cursor.commit()
print(df)