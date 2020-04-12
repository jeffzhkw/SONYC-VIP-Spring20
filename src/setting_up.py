import _sqlite3

sql_create_audio_table = '''
    CREATE TABLE IF NOT EXISTS recording (
    id integer Primary Key autoincrement, 
    name text NOT NULL, 
    length float NOT NULL,
    data text NOT NULL
'''

sql_insert_audio = '''
    INSERT INTO recording(name, length, data)
    VALUES (?, ?, ?) 
'''

def get_connection():
    conn = _sqlite3.connect("audio.db")
    return conn

def create_table():
    connection = get_connection()
    connection.execute(sql_create_audio_table)
    connection.close()

# @Todo: Add condition to check if table exist
def insert_into_db(recording):
    connection = get_connection()
    connection.execute(sql_insert_audio, recording)
    connection.commit()
    connection.close()