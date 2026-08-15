const express = require("express");
const { initDB } = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database schema
initDB();

// API Routes
app.use("/api/books", bookRoutes);

// Landing page route
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JU CSE - Books Store API</title>

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
    width:700px;
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
    font-size:42px;
    margin-bottom:10px;
}

.subtitle{
    font-size:20px;
    color:#dbeafe;
    margin-bottom:25px;
}

.api-link {
    display:inline-block;
    padding:12px 25px;
    background:#3b82f6;
    color:white;
    text-decoration:none;
    border-radius:20px;
    font-weight:600;
    margin-bottom:30px;
    transition: 0.3s;
}

.api-link:hover {
    background:#2563eb;
    transform:translateY(-3px);
}

.team{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:15px;
}

.member{
    padding:10px 20px;
    border-radius:30px;
    background:rgba(255,255,255,.15);
    transition:.3s;
    font-weight:600;
}

.member:hover{
    background:white;
    color:#1e3a8a;
    transform:translateY(-3px);
}

@keyframes fadeIn{
    from{
        opacity:0;
        transform:translateY(30px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}
</style>

</head>

<body>

<div class="container">

<h1>Welcome to JU CSE Books Store</h1>

<p class="subtitle">
Department of Computer Science & Engineering - Lab 03 CRUD API
</p>

<a href="/api/books" class="api-link">View Books API (/api/books)</a>

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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});