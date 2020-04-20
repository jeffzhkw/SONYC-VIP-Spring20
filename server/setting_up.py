import _sqlite3

sql_create_user_table = '''
    CREATE TABLE IF NOT EXISTS USER(
        USERID INTEGER PRIMARY KEY AUTOINCREMENT, 
        USERNAME TEXT NOT NULL,
        PASSWORD TEXT NOT NULL
    )
'''
sql_create_audio_table = '''
    CREATE TABLE IF NOT EXISTS RECORDING (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL, 
    DATA TEXT NOT NULL,
    FOREIGN KEY(AUTHOR) REFERENCES USER(USERID))
'''

sql_insert_user = '''
    INSERT INTO USER(USERNAME, PASSWORD) VALUES (?,?)
'''

sql_insert_audio = '''
    INSERT INTO RECORDING(NAME, DATA, AUTHOR)
    VALUES (?, ?, ?) 
'''

sql_select_all = '''
    SELECT * FROM RECORDING
'''

sql_select_with_name = '''
    SELECT * FROM RECORDING WHERE NAME = ?
'''

def get_connection():
    try:
        conn = _sqlite3.connect("audio.db")
        return conn
    except:
        print("Exception occurs in connection")

def create_table():
    try:
        connection = get_connection()
        connection.execute(sql_create_audio_table)
        connection.close()
    except:
        print("Exception occurs in creating table")

# @Todo: Add condition to check if table exist
def insert_into_db(recording):
    try:
        create_table()
        connection = get_connection()
        cursor = connection.cursor()
        print(recording)
        dbRecording = (recording.name, recording.data)
        cursor.execute(sql_insert_audio, dbRecording)
        connection.commit()
        connection.close()
        print("success")
    except:
        print("Exception in inserting into the db")

def getting_audio(name):
    try:
        connection = get_connection()
        cursor = connection.cursor()
        if name is None:
            cursor.execute(sql_select_all)
            rows = cursor.fetchall()
            print(rows)
        else:
            cursor.execute(sql_select_with_name, [name])
            rows = cursor.fetchall()
            print(rows)
        connection.close()
    except:
        print("Exception in getting audio from db")

