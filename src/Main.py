from flask import Flask
from flask import request, render_template

app = Flask(__name__)


@app.route('/hello') #what url will execute the function
def helloWorld():
    return ("Hello world")


@app.route('/') 

def index():
    return render_template("index.html")

"""
@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'

"""
if __name__ == "__main__":
    app.debug = True
    app.run()

