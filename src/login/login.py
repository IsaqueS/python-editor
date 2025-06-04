from flask import Blueprint, render_template, request, jsonify
from flask.wrappers import Response
from typing import Literal

login = Blueprint("login", __name__)

@login.route("/login")
def index() -> str:
    return render_template("login/login.html")

@login.route("/login/data/", methods=["POST"])
def login_receive_data() -> tuple[Response, Literal[200, 400]]:
    
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()

    print(data)

    # print(type(data))

    return jsonify({"status": "success"}), 200

