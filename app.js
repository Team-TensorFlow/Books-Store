const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JU CSE</title>

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

/* Animated background */
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

.logo{
    font-size:70px;
    margin-bottom:10px;
}

h1{
    font-size:48px;
    margin-bottom:15px;
}

.subtitle{
    font-size:22px;
    color:#dbeafe;
    margin-bottom:35px;
}

.team{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:15px;
}

.member{
    padding:12px 24px;
    border-radius:30px;
    background:rgba(255,255,255,.15);
    transition:.3s;
    font-weight:600;
}

.member:hover{
    background:white;
    color:#1e3a8a;
    transform:translateY(-5px) scale(1.05);
}

.footer{
    margin-top:35px;
    color:#e5e7eb;
    font-size:15px;
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

<h1>Welcome to JU CSE</h1>

<p class="subtitle">
Department of Computer Science & Engineering
</p>

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
    console.log("Server running at http://localhost:3000");
});