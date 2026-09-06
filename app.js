require('dotenv').config(); // MUST BE LINE 1

const express = require("express");
const cors = require("cors");
const { initDB } = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/orders', orderRoutes);

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JU CSE Books Store</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb);
            padding: 20px;
        }

        .container {
            z-index: 2;
            width: 850px;
            padding: 40px;
            text-align: center;
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            color: white;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        h1 { font-size: 36px; margin-bottom: 20px; font-weight: 700; }
        h3 { font-size: 18px; margin-bottom: 10px; color: #cbd5e1; }

        .auth-section {
            background: rgba(0, 0, 0, 0.2);
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 20px;
        }

        .form-row {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }

        input, select {
            padding: 10px 14px;
            border-radius: 20px;
            border: none;
            outline: none;
            font-size: 14px;
        }

        button {
            border: none;
            cursor: pointer;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            transition: 0.3s;
        }

        .reg-btn { background: #10b981; }
        .login-btn { background: #3b82f6; }
        .api-btn { background: #2563eb; }
        .user-btn { background: #059669; }
        .author-btn { background: #9333ea; }
        .order-btn { background: #ea580c; }

        button:hover { transform: translateY(-2px); opacity: 0.9; }

        .btn-container {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        pre {
            background: rgba(0, 0, 0, 0.6);
            padding: 15px;
            border-radius: 12px;
            text-align: left;
            max-height: 220px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 13px;
            color: #38bdf8;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .team { display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; }
        .member {
            padding: 8px 20px;
            border-radius: 30px;
            background: rgba(255, 255, 255, 0.15);
            font-weight: 600;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>JU CSE Books Store Portal</h1>

        <!-- Register & Login Section -->
        <div class="auth-section">
            <h3>User Registration</h3>
            <div class="form-row">
                <input id="regName" type="text" placeholder="Full Name">
                <input id="regEmail" type="email" placeholder="Email Address">
                <input id="regPassword" type="password" placeholder="Password">
                <select id="regRole">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button class="reg-btn" onclick="registerUser()">Register</button>
            </div>

            <h3 style="margin-top: 15px;">User Login</h3>
            <div class="form-row">
                <input id="loginEmail" type="email" placeholder="Email" value="naeem@example.com">
                <input id="loginPassword" type="password" placeholder="Password" value="password123">
                <button class="login-btn" onclick="loginUser()">Log In & Save Token</button>
            </div>
        </div>

        <!-- API Testing Buttons -->
        <div class="btn-container">
            <button class="api-btn" onclick="callAPI('/api/books')">Fetch Books</button>
            <button class="user-btn" onclick="callAPI('/api/users')">Fetch Users (Protected)</button>
            <button class="author-btn" onclick="callAPI('/api/authors')">Fetch Authors</button>
            <button class="order-btn" onclick="callAPI('/api/orders')">Fetch Orders</button>
        </div>

        <!-- API Response Console -->
        <pre id="output">// API responses will display here...</pre>

        <!-- Team Section -->
        <div class="team">
            <div class="member">Naeem</div>
            <div class="member">Mahadi</div>
            <div class="member">Limon</div>
            <div class="member">Fahim</div>
        </div>
    </div>

    <script>
        async function registerUser() {
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const role = document.getElementById('regRole').value;

            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await res.json();
            document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        }

        async function loginUser() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                document.getElementById('output').innerText = "Login Successful! JWT Token saved to LocalStorage.";
            } else {
                document.getElementById('output').innerText = JSON.stringify(data, null, 2);
            }
        }

        async function callAPI(endpoint) {
            const token = localStorage.getItem('token');
            const res = await fetch(endpoint, {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await res.json();
            document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
    `);
});

initDB()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("🚀 Server running at http://localhost:" + PORT);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to initialize database:", err);
    });