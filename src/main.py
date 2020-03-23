from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/audio', methods = ['POST'])
def upload():
    if(request.methods == 'POST'):
        return "" #handler for audio processing here