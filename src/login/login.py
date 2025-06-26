from flask import Blueprint, render_template, request, jsonify
from flask.wrappers import Response
from typing import Literal
from backend.database import cursor
import sqlite3


login = Blueprint("login", __name__)

@login.route("/login")
def index() -> str:
    return render_template("login/login.html")

@login.route("/login/data/", methods=["POST"])
def login_receive_data() -> tuple[Response, Literal[200, 400,401,500]]:
    
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    
    data = request.get_json()
    email: str = data.get("email")
    password: str = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing Email or Password"}), 401
    
    try:
        cursor.execute("SELECT password FROM users WHERE email = ?", (email,))

        db_password = cursor.fetchone()

        if db_password and db_password[0] == password:
            cursor.execute("SELECT uid from users WHERE email = ?", (email,))
            uid: str = cursor.fetchone()
            return jsonify({"status": "success", "token": uid[0]}), 200
        else:
            return jsonify({"status": "account-not-found"}), 401
    except sqlite3.Error as e:
        print("SQLITE ERROR: %s"%e)
        return jsonify({"status": "sqlite"}), 500

