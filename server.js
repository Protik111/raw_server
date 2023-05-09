const http = require("http");

const students = [
    {
        name: "Rafiur"
    },
    {
        name: "Protik"
    }
]

const server = http.createServer((req, res) => {
    // console.log(req.url);
    if(req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: "Successful" }))
        res.end();
    }else if(req.url === '/student') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(students))
        res.end();
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "Resource not found" }));
        res.end();
    }
});

server.listen(4000, () => {
    console.log('Server is listening to port 4000');
})