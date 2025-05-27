from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index() -> str:
    return render_template("index.html")

@app.route("/create_account")
def create_account() -> str:
    return render_template("login/create_account.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
