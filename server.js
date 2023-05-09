const http = require("http");

const students = [
    {
        name: "Rafiur"
    },
    {
        name: "Protik"
    }
];

const sendResponse = (res, { contentType = "application/json", status = 200, body = {} }) => {
    res.writeHead(status, { 'Content-Type': contentType })
    res.write(JSON.stringify(body))
    res.end();
}

const server = http.createServer((req, res) => {
    // console.log(req.url);
    if (req.url === '/') {
        sendResponse(res, {
            body: {
                message: "Successful"
            }
        })
    } else if (req.url === '/student') {
        sendResponse(res, {
            body: students
        })
    }
    else {
        sendResponse(res, {
            status: 404,
            body: { message: "Resource not found" }
        })
    }
});

server.listen(4000, () => {
    console.log('Server is listening to port 4000');
})