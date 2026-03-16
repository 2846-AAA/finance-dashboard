# FinTrack — Smart Personal Finance Dashboard

A full-stack banking-domain web application built with **React.js**, **Flask**, **MongoDB**, and **JWT Authentication**.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Flask](https://img.shields.io/badge/Flask-3.0-black?logo=flask) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## Live Demo
- **Frontend:** [https://finance-dashboard.vercel.app](https://finance-dashboard.vercel.app)
- **Backend API:** [https://finance-dashboard-api.onrender.com](https://finance-dashboard-api.onrender.com)

---

## Features

- **JWT Authentication** — Secure register/login with token-based session management
- **Role-Based Access** — Each user sees only their own data (RBAC via JWT claims)
- **Transaction Management** — Add, view, and delete income/expense entries with categories
- **Real-Time Analytics** — Live dashboard with income vs expense area chart, category pie chart, spending bar chart
- **MongoDB Aggregation** — Server-side aggregation queries for summary stats and category breakdowns
- **Responsive Design** — Mobile-first layout using Material UI (MUI) and React Responsive patterns
- **Savings Rate Calculator** — Automatically computed from aggregated transaction data

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router, Material UI (MUI), Recharts |
| Backend | Python, Flask, Flask-CORS, REST API |
| Database | MongoDB Atlas, PyMongo, Aggregation Pipeline |
| Auth | JWT (JSON Web Tokens), bcrypt password hashing |
| Deployment | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub |

---

## Project Structure

```
finance-dashboard/
├── backend/
│   ├── app.py              # Flask app entry point
│   ├── db.py               # MongoDB connection (PyMongo)
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables (not committed)
│   └── routes/
│       ├── auth.py         # Register/Login endpoints with JWT
│       └── transactions.py # CRUD + MongoDB aggregation endpoints
│
└── frontend/
    ├── src/
    │   ├── App.jsx          # React Router setup
    │   ├── api.js           # Axios instance with JWT interceptor
    │   ├── theme.js         # MUI custom theme
    │   ├── pages/
    │   │   ├── Login.jsx    # Login page
    │   │   ├── Register.jsx # Register with password strength
    │   │   └── Dashboard.jsx # Main app — charts, forms, history
    │   └── components/
    │       └── StatCard.jsx  # Reusable metric card component
    └── vite.config.js
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create new user account |
| POST | `/api/auth/login` | No | Login and receive JWT token |
| GET | `/api/transactions/` | Yes | Get all transactions for user |
| POST | `/api/transactions/` | Yes | Add new transaction |
| DELETE | `/api/transactions/:id` | Yes | Delete a transaction |
| GET | `/api/transactions/summary` | Yes | Aggregated stats, categories, monthly trend |

---

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account (free)

### 1. Clone the repository
```bash
git clone https://github.com/2846-AAA/finance-dashboard.git
cd finance-dashboard
```

### 2. Run setup (Windows)
```bash
SETUP.bat
```

### 3. Configure MongoDB Atlas
1. Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Go to **Connect → Drivers** and copy your connection string
3. Open `backend/.env` and replace `MONGO_URI` with your connection string

### 4. Start the app
```bash
START_APP.bat
```
Open [http://localhost:5173](http://localhost:5173)

---

## Deployment

- **Backend** deployed on [Render](https://render.com) as a Python web service
- **Frontend** deployed on [Vercel](https://vercel.com) with environment variable `VITE_API_URL` pointing to the Render backend

---

## Screenshots

> Register → Login → Dashboard with charts → Add transactions → View analytics

---

## Author

**Anuja Dhamdhere** — Python Full Stack Developer  
[LinkedIn](https://linkedin.com/in/anuja-dhamdhere-90795a2b8) | [GitHub](https://github.com/2846-AAA)
