from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth import auth_bp
from routes.transactions import transactions_bp

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:3000", "*"])

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(transactions_bp, url_prefix='/api/transactions')


@app.route('/')
def health():
    return {"status": "Finance Dashboard API is running", "version": "1.0.0"}


if __name__ == '__main__':
    app.run(debug=True, port=5000)
