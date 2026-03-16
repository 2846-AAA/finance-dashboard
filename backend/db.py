import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["finance_dashboard"]

users_col = db["users"]
transactions_col = db["transactions"]
