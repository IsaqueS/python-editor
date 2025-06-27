from flask import Blueprint, render_template, request
from backend.database import cursor

editor = Blueprint("editor", __name__)

@editor.route("/editor")
def main () -> str:

    user_id = request.args.get("id")

    cursor.execute("SELECT email FROM users WHERE uid = ?", (user_id,))

    email = cursor.fetchone()

    print(email)

    return render_template("editor/editor.html", email=str(email[0]))