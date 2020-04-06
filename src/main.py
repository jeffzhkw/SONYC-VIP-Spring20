from flask import Flask, request
from src.recording import Recording
import src.setting_up as sql
app = Flask(__name__)

def make_recording(id, name, length):
    return Recording(id,name, length)

@app.route('/')
def main():
    return 'Hello, World!'

@app.route('/audio', methods = ['GET','POST'])
def upload():
    if request.method == 'POST':
        name = request.form['name']
        length = request.form['length']
        data = request.form['data']
        recording = make_recording(name, length, data)
        sql.insert_into_db(recording)
        return "success" #add HTTP code
    elif request.method == 'GET':
        return "Hello world";

app.run()