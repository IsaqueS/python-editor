from flask import Blueprint, render_template, request, jsonify

login: Blueprint = Blueprint("login", __name__, template_folder="templates", static_folder="static")

@login.route("/create_account")
def load_create_account_page() -> str:
    return "HELLO"