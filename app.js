const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <html>
        <body style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-size:60px;
            font-family:Arial;
        ">

        Limon Gay
        

        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});