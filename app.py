from typing import Literal
from flask import Flask, render_template, request, jsonify
from flask.wrappers import Response

app = Flask(__name__)

@app.route("/")
def index() -> str:
    return render_template("index.html")

@app.route("/create_account")
def create_account() -> str:
    return render_template("login/create_account.html")

@app.route("/login")
def login() -> str:
    return render_template("login/login.html")

@app.route("/login/data/", methods=["POST"])
def login_receive_data() -> tuple[Response, Literal[200, 400]]:
    
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()

    print(data)

    # print(type(data))

    return jsonify({"status": "success"}), 200

@app.route("/create_account/data/", methods=["POST"])
def create_account_receive_data() -> tuple[Response, Literal[200, 400]]:
    
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()

    print(data)

    # print(type(data))

    return jsonify({"status": "success"}), 200 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
