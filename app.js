const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JU CSE</title>
        </head>
        <body style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f8f9fa;
        ">

            <h1 style="
                font-size: clamp(28px, 5vw, 48px); 
                color: #1a1a1a; 
                margin: 0 0 16px 0;
            ">
                Welcome to JU CSE!!!
            </h1>

            <p style="
                font-size: clamp(16px, 2.5vw, 24px); 
                color: #555555; 
                margin: 0;
            ">
                <b>Developers:</b> Naeem, Mahadi, Limon, Fahim
            </p>

        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});