from flask import Flask, request
from server.recording import Recording
import server.setting_up as sql
app = Flask(__name__)

def make_recording(id, name, length):
    return Recording(id,name, length)

@app.route('/')
def main():
    connection = sql.get_connection()
    sql.sql_create_audio_table(connection)
    sql.close_db(connection)
    return 'Hello, World!'

@app.route('/frontend', methods = ['POST'])
def upload():
    if(request.methods == 'POST'):
        name = request.form['name']
        length = request.form['length']
        data = request.form['data']
        recording = make_recording(name, length, data)
        connection = sql.get_connection()
        sql.sql_insert_audio(connection, recording)
        sql.close_db(connection)
        return "success" #add HTTP code

app.run()