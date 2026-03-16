from flask import Blueprint, request, jsonify
from db import transactions_col
from bson import ObjectId
import jwt
import os
from functools import wraps
from datetime import datetime

transactions_bp = Blueprint('transactions', __name__)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '').strip()
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            data = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            request.user_id = data['user_id']
            request.user_name = data['name']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


@transactions_bp.route('/', methods=['GET'])
@token_required
def get_transactions():
    txns = list(transactions_col.find(
        {"user_id": request.user_id}
    ).sort("date", -1).limit(50))
    for t in txns:
        t['_id'] = str(t['_id'])
    return jsonify(txns), 200


@transactions_bp.route('/', methods=['POST'])
@token_required
def add_transaction():
    data = request.get_json()
    if not data or not data.get('title') or not data.get('amount') or not data.get('type'):
        return jsonify({"error": "title, amount and type are required"}), 400
    if data['type'] not in ['income', 'expense']:
        return jsonify({"error": "type must be income or expense"}), 400

    now = datetime.utcnow()
    doc = {
        "user_id": request.user_id,
        "title": data['title'],
        "amount": float(data['amount']),
        "type": data['type'],
        "category": data.get('category', 'Other'),
        "note": data.get('note', ''),
        "date": now.isoformat(),
        "month": now.strftime("%b %Y"),
        "day": now.strftime("%Y-%m-%d"),
    }
    result = transactions_col.insert_one(doc)
    doc['_id'] = str(result.inserted_id)
    return jsonify(doc), 201


@transactions_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_transaction(id):
    result = transactions_col.delete_one({
        "_id": ObjectId(id),
        "user_id": request.user_id
    })
    if result.deleted_count == 0:
        return jsonify({"error": "Transaction not found"}), 404
    return jsonify({"message": "Deleted successfully"}), 200


@transactions_bp.route('/summary', methods=['GET'])
@token_required
def get_summary():
    # Total income vs expense
    totals_pipeline = [
        {"$match": {"user_id": request.user_id}},
        {"$group": {"_id": "$type", "total": {"$sum": "$amount"}}}
    ]
    totals = list(transactions_col.aggregate(totals_pipeline))
    summary = {"income": 0, "expense": 0}
    for r in totals:
        summary[r['_id']] = round(r['total'], 2)
    summary['balance'] = round(summary['income'] - summary['expense'], 2)
    summary['savings_rate'] = round(
        (summary['balance'] / summary['income'] * 100), 1
    ) if summary['income'] > 0 else 0

    # Spending by category
    cat_pipeline = [
        {"$match": {"user_id": request.user_id, "type": "expense"}},
        {"$group": {"_id": "$category", "total": {"$sum": "$amount"}}},
        {"$sort": {"total": -1}}
    ]
    categories = [{"category": r['_id'], "total": round(r['total'], 2)}
                  for r in transactions_col.aggregate(cat_pipeline)]

    # Monthly trend (last 6 months)
    monthly_pipeline = [
        {"$match": {"user_id": request.user_id}},
        {"$group": {
            "_id": {"month": "$month", "type": "$type"},
            "total": {"$sum": "$amount"}
        }},
        {"$sort": {"_id.month": 1}}
    ]
    monthly_raw = list(transactions_col.aggregate(monthly_pipeline))
    months_map = {}
    for r in monthly_raw:
        m = r['_id']['month']
        if m not in months_map:
            months_map[m] = {"month": m, "income": 0, "expense": 0}
        months_map[m][r['_id']['type']] = round(r['total'], 2)
    monthly = list(months_map.values())[-6:]

    summary['categories'] = categories
    summary['monthly'] = monthly
    summary['transaction_count'] = transactions_col.count_documents({"user_id": request.user_id})

    return jsonify(summary), 200
