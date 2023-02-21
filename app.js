const express = require("express");
const app = express();
app.use((req, res, next) => {
    console.log("haris1");
    next(); // Allows the request to continue to the next middleware in the line
});

app.use((req, res, next) => {
    console.log("haris2");
    res.send("<h1>This is  working absolutely fine</h1>");
});

app.listen(3000);