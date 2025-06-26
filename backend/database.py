import sqlite3

connection: sqlite3.Connection = sqlite3.connect("database.db", check_same_thread=False)

cursor: sqlite3.Cursor = connection.cursor()

create_account_table = """
CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY,
   password TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   uid TEXT NOT NULL UNIQUE,
   code TEXT
);
"""

# print(create_account_table)

cursor.execute(create_account_table)

connection.commit()