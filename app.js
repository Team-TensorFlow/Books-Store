const express = require("express");
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes'); // Added Author Routes
const orderRoutes = require('./routes/orderRoutes');   // Added Order Routes

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes); // Mounted Author API
app.use('/api/orders', orderRoutes);   // Mounted Order API

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
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb);
    overflow:hidden;
}

body::before{
    content:'';
    position:absolute;
    width:700px;
    height:700px;
    background:rgba(255,255,255,.08);
    border-radius:50%;
    top:-220px;
    left:-220px;
    filter:blur(10px);
}

body::after{
    content:'';
    position:absolute;
    width:500px;
    height:500px;
    background:rgba(255,255,255,.08);
    border-radius:50%;
    bottom:-150px;
    right:-150px;
}

.container{
    position:relative;
    z-index:2;
    width:800px; /* Slightly widened to fit 4 buttons comfortably */
    padding:50px;
    text-align:center;
    background:rgba(255,255,255,.12);
    backdrop-filter:blur(18px);
    border:1px solid rgba(255,255,255,.2);
    border-radius:25px;
    color:white;
    box-shadow:0 20px 50px rgba(0,0,0,.4);
    animation:fadeIn 1s ease;
}

h1{
    font-size:44px;
    margin-bottom:30px;
    font-weight:700;
}

.btn-container {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 35px;
    flex-wrap: wrap;
}

.api-btn {
    background: #2563eb;
    color: white;
    padding: 14px 28px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
}

.api-btn:hover {
    background: #1d4ed8;
    transform: translateY(-3px);
}

/* User Button Styles */
.api-btn.user-btn {
    background: #059669;
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4);
}
.api-btn.user-btn:hover {
    background: #047857;
}

/* Author Button Styles */
.api-btn.author-btn {
    background: #9333ea;
    box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4);
}
.api-btn.author-btn:hover {
    background: #7e22ce;
}

/* Order Button Styles */
.api-btn.order-btn {
    background: #ea580c;
    box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4);
}
.api-btn.order-btn:hover {
    background: #c2410c;
}

.team{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:15px;
}

.member{
    padding:10px 24px;
    border-radius:30px;
    background:rgba(255,255,255,.15);
    transition:.3s;
    font-weight:600;
    color: white;
    font-size: 15px;
}

.member:hover{
    background:white;
    color:#1e3a8a;
    transform:translateY(-3px);
}

@keyframes fadeIn{
    from{ opacity:0; transform:translateY(30px); }
    to{ opacity:1; transform:translateY(0); }
}
</style>
</head>

<body>

<div class="container">
  <h1>Welcome to JU CSE Books Store</h1>

  <div class="btn-container">
    <a href="/api/books" class="api-btn">View Books API (/api/books)</a>
    <a href="/api/users" class="api-btn user-btn">View Users API (/api/users)</a>
    <a href="/api/authors" class="api-btn author-btn">View Authors API (/api/authors)</a>
    <a href="/api/orders" class="api-btn order-btn">View Orders API (/api/orders)</a>
  </div>

  <div class="team">
    <div class="member">Naeem</div>
    <div class="member">Mahadi</div>
    <div class="member">Limon</div>
    <div class="member">Fahim</div>
  </div>
</div>

</body>
</html>
`);
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});