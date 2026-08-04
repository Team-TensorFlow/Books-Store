const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>JU CSE</title>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                }

                h1 {
                    font-size: 60px;
                    color: #0066cc;
                }

                p {
                    font-size: 25px;
                    color: #333;
                }
            </style>
        </head>

        <body>
            <h1>Welcome to JU CSE!!!</h1>
            <p><b>Developer: Naeem, Mahadi, Limon, Fahim</b></p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});