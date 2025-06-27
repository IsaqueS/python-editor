from typing import Literal
from flask import Flask, render_template, request, jsonify
from flask.wrappers import Response


# Import Blueprints here!
from src.robot import robot
from src.login.create_account import create_account
from src.login.login import login
from src.index import main
from src.editor.editor import editor


app = Flask(__name__)

# Setup blueprints here
app.register_blueprint(main)
app.register_blueprint(robot)
app.register_blueprint(login)
app.register_blueprint(create_account)
app.register_blueprint(editor)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
