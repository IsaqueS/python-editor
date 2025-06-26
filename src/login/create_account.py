from flask import Blueprint, render_template, jsonify, request
from flask.wrappers import Response
from typing import Literal
import sqlite3
import uuid

from backend.database import connection, cursor

create_account = Blueprint("create_account", __name__)

@create_account.route("/create_account")
def index() -> str:
    return render_template("login/create_account.html")

@create_account.route("/create_account/data/", methods=["POST"])
def create_account_receive_data() -> tuple[Response, Literal[200, 400, 500]]:

    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()

    # print(data)

    insert_query = "INSERT INTO users (password, email, uid) VALUES (?, ?, ?)"

    uid = str(uuid.uuid4())

    try:
        cursor.execute(insert_query, (data["password"], data["email"], uid))

        connection.commit()

        print("USER: %s added"%data["email"])
    except sqlite3.Error as e:
        print("SQLITE ERROR: %s"%e)
        return jsonify({"status": "server-error"}), 500

    return jsonify({"status": "success", "token": uid}), 200 
