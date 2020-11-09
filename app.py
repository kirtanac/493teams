import os
from threading import Thread

import numpy as np
import pandas as pd
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask.json import JSONEncoder
from jikanpy import Jikan
from sklearn.metrics.pairwise import pairwise_distances
from pymongo import MongoClient
from bson import json_util
import time


jikan = Jikan()

import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file",
         "https://www.googleapis.com/auth/drive"]

creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
gs = gspread.authorize(creds)
review_sheet = gs.open("reviews").sheet1
get_similar_users = None
recommendations = {"user": {}, "item": {}, "user-based": {}}


# define a custom encoder point to the json_util provided by pymongo (or its dependency bson)
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj): return json_util.default(obj)

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.json_encoder = CustomJSONEncoder
CORS(app)

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')

@app.route('/favicon.ico', methods=["GET"])
def favicon():
    return app.send_static_file('favicon.ico')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
