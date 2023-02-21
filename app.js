const http = require("http");
const express = require("express");
const app = express();
app.use((req,res,next)=>{
    console.log("1st middleware is working");
    next(); // Allows the request to continue to the next middleware in the line
});

app.use((req,res,next)=>{
    console.log("2nd middleware is working");
    res.send("<h1>This is working absolutely fine</h1>");
    next();
});
// const routes =  require('./routes');
// const server = http.createServer(routes);
const server = http.createServer(app);
server.listen(3000);