import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for, make_response, jsonify)
from flask_cors import CORS, cross_origin
import cloudinary
import cloudinary.uploader
import cloudinary.api
# from cloudinary.utils import cloudinary_url
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)
CORS(app)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)

# Resources Collection
eventsdb = mongo.db.events

# Categories Collection
users = mongo.db.users

# Users Collection
reportsdb = mongo.db.reports


@app.route("/")
def base():
    return render_template("index.html")


@app.route("/home/<username>")
@app.route("/<username>")
def index(username):

    if session["user"]:
        username = users.find_one(
            {"username": session["user"]})["username"]
        return render_template("index.html", username=username)

    return render_template("index.html")


@app.route("/events")
@app.route("/get_events")
def get_events():
    events = eventsdb.find()
    length = events.count()
    return render_template("events.html", events=events, length=length)


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if user exists
        existing_user = users.find_one(
            {"username": request.form.get("username").lower()})
        if existing_user:
            flash("Username already exists", category="error")
            return redirect(url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        users.insert_one(register)

        # session the user
        session["user"] = request.form.get("username").lower()
        flash("Registered Successfully", category="success")
        return redirect(url_for("reports", username=session["user"]))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if user exists
        existing_user = users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))

                return redirect(url_for("reports", username=session["user"]))
            else:
                flash("Incorrect Username and/or Password", category="error")
                return redirect(url_for("login"))

        else:
            flash("Incorrect Username and/or Password", category="error")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("user")
    return redirect(url_for("base"))


@app.route("/create-report", methods=["POST"])
def createReport():
    if request.method == "POST":
        req = request.get_json()
        create = {
            "report_desc": req["report_desc"],
            "report_id": req["report_id"],
            "report_date": req["report_date"],
            "report_map": req["report_map"],
            "report_user": session["user"],
            "report_images": req['report_images'],
            "report_long": req["report_long"],
            "report_lat": req["report_lat"]}

        result = reportsdb.insert_one(create)

    res = make_response(jsonify({"message": result.acknowledged}), 200)
    return res


@app.route("/reports/<username>", methods=["GET", "POST"])
def reports(username):
    username = users.find_one(
        {"username": session["user"]})["username"]

    if session["user"]:
        reports = reportsdb.find(
            {"report_user": session["user"]})
        length = reports.count()
        return render_template(
            "reports.html", reports=reports, username=username, length=length)

    return redirect(url_for("login"))


@app.route("/update-report", methods=["POST"])
def updateReport():
    if request.method == "POST":
        req = request.get_json()
        update = {
            "report_desc": req["report_desc"]
        }
        result = reportsdb.update_one(
            {'_id': ObjectId(req["_id"])}, {'$set': update}, upsert=False)

    res = make_response(jsonify({"message": result.acknowledged}), 200)
    return res


@app.route("/delete-report", methods=["POST"])
def deleteReport():
    if request.method == "POST":
        req = request.get_json()
        result = reportsdb.delete_one(
            {'_id': ObjectId(req["_id"])})

    print(result.deleted_count)

    res = make_response(jsonify({"message": result.deleted_count}), 200)
    return res


@app.route("/upload-image", methods=['POST'])
@cross_origin()
def upload_file():
    cloudinary.config(cloud_name=os.getenv('CLOUD_NAME'),
                      api_key=os.getenv('API_KEY'),
                      api_secret=os.getenv('API_SECRET'))

    upload_result = None
    if request.method == 'POST':
        file_to_upload = request.files['file']

    if file_to_upload:
        upload_result = cloudinary.uploader.upload(file_to_upload)

    return jsonify(upload_result)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
