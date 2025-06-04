from flask import Blueprint

robot = Blueprint("robot", __name__)

@robot.route("/robot")
def index() -> str:
    return "Hey robots, huh, go awai pretue pluasee UWU?"