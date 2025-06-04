from flask import Blueprint, render_template, jsonify, request
from flask.wrappers import Response
from typing import Literal

create_account = Blueprint("create_account", __name__)

@create_account.route("/create_account")
def index() -> str:
    return render_template("login/create_account.html")

@create_account.route("/create_account/data/", methods=["POST"])
def create_account_receive_data() -> tuple[Response, Literal[200, 400]]:
    
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()

    print(data)

    # print(type(data))

    return jsonify({"status": "success"}), 200 
