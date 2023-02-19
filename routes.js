    const fs = require("fs");
    
    const requestHandler=(req,res)=>{
    console.log("working12");
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<body>');
        res.write('<form method="POST" action="/message"><input name="message" type="text"></input><input type="submit" value="send message" /></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === "POST"){
        const body= [];
        req.on("data",(chunk)=>{
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message   = parseBody.split("=")[1];
            fs.writeFile("welcome.txt",message, err => {
                console.log(err);
            });
        });
        res.statusCode = 302;
        res.setHeader("location","/");
        return res.end();
    }
    res.setHeader("Content-Type","text/html");
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Hello , Your hit url is '+url+'</h1>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
}

module.exports=requestHandler;