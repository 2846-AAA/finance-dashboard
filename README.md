<div align="center">

# 💰 FinTrack — Smart Personal Finance Dashboard

### A full-stack banking-domain web application

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

### 🌐 [Live Demo](https://finance-dashboard-7l6d.vercel.app) &nbsp;&nbsp;|&nbsp;&nbsp; ⚙️ [Backend API](https://finance-dashboard-api-46pd.onrender.com) &nbsp;&nbsp;|&nbsp;&nbsp; 💻 [GitHub](https://github.com/2846-AAA/finance-dashboard)

<br/>

> Track income, manage expenses, and build wealth with smart analytics and real-time insights — built for the banking domain.

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure register/login with token-based session management |
| 👤 **Role-Based Access** | Each user sees only their own data (RBAC via JWT claims) |
| 💳 **Transaction Management** | Add, view, and delete income/expense entries with categories |
| 📊 **Real-Time Analytics** | Live area chart, category pie chart, and spending bar chart |
| 🗄️ **MongoDB Aggregation** | Server-side aggregation for summary stats and category breakdowns |
| 📱 **Responsive Design** | Mobile-first layout using Material UI (MUI) |
| 💹 **Savings Rate Calculator** | Auto-computed from aggregated transaction data |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 18, React Router, Material UI (MUI), Recharts |
| **Backend** | Python, Flask, Flask-CORS, REST API |
| **Database** | MongoDB Atlas, PyMongo, Aggregation Pipeline |
| **Auth** | JWT (JSON Web Tokens), bcrypt password hashing |
| **Deployment** | Vercel (frontend), Render (backend) |
| **Version Control** | Git, GitHub |

---

## 📁 Project Structure

```
finance-dashboard/
├── backend/
│   ├── app.py                  # Flask app entry point
│   ├── db.py                   # MongoDB connection via PyMongo
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (not committed)
│   └── routes/
│       ├── auth.py             # Register/Login with JWT
│       └── transactions.py     # CRUD + MongoDB aggregation
│
└── frontend/
    ├── src/
    │   ├── App.jsx             # React Router setup
    │   ├── api.js              # Axios instance with JWT interceptor
    │   ├── theme.js            # MUI custom theme
    │   ├── pages/
    │   │   ├── Login.jsx       # Login page
    │   │   ├── Register.jsx    # Register with password strength meter
    │   │   └── Dashboard.jsx   # Charts, forms, transaction history
    │   └── components/
    │       └── StatCard.jsx    # Reusable metric card component
    └── vite.config.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/register` | ❌ | Create new user account |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT token |
| `GET` | `/api/transactions/` | ✅ | Get all transactions for user |
| `POST` | `/api/transactions/` | ✅ | Add new transaction |
| `DELETE` | `/api/transactions/:id` | ✅ | Delete a transaction |
| `GET` | `/api/transactions/summary` | ✅ | Aggregated stats + monthly trend |

---

## 🚀 Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account *(free)*

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/2846-AAA/finance-dashboard.git
cd finance-dashboard

# 2. Install all dependencies
SETUP.bat

# 3. Add your MongoDB URI to backend/.env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/finance_dashboard

# 4. Start both servers
START_APP.bat
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [finance-dashboard-7l6d.vercel.app](https://finance-dashboard-7l6d.vercel.app) |
| Backend API | Render | [finance-dashboard-api-46pd.onrender.com](https://finance-dashboard-api-46pd.onrender.com) |
| Database | MongoDB Atlas | Hosted on AWS Mumbai (ap-south-1) |

> ⚠️ **Note:** The free Render instance may take **30-50 seconds** to wake up on first request after inactivity. This is expected behaviour on the free tier.

---

## 👩‍💻 Author

<div align="center">

**Anuja Dhamdhere** — Python Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/anuja-dhamdhere-90795a2b8)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/2846-AAA)

</div>
