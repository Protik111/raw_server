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
    console.log(body);
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
    } else if (req.url === '/student' && req.method.toLocaleLowerCase() === 'get') {
        sendResponse(res, {
            body: students
        })
    } else if (req.url === '/student' && req.method.toLocaleLowerCase() === 'post') {
        // console.log('req', req.body);
        let body = '';

        //event for getting any data
        req.on("data", (chunk) => {
            body += chunk.toString();
        })

        //event ending
        req.on("end", () => {
            console.log('Data from post method', body);
            const payload = JSON.parse(body)
            students.push(payload)
            sendResponse(res, { status: 201, body: { message: body } })
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