from flask import Blueprint, request, jsonify
from db import users_col
import bcrypt
import jwt
import os
import datetime

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"error": "All fields are required"}), 400
    if users_col.find_one({"email": data['email']}):
        return jsonify({"error": "User already exists"}), 400
    hashed = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    users_col.insert_one({
        "name": data['name'],
        "email": data['email'],
        "password": hashed,
        "created_at": datetime.datetime.utcnow().isoformat()
    })
    return jsonify({"message": "Registered successfully"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password required"}), 400
    user = users_col.find_one({"email": data['email']})
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    token = jwt.encode(
        {
            "user_id": str(user['_id']),
            "name": user['name'],
            "email": user['email'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
        },
        os.getenv("JWT_SECRET"),
        algorithm="HS256"
    )
    return jsonify({"token": token, "name": user['name'], "email": user['email']}), 200
