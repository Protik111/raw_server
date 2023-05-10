const http = require("http");
const fs = require("fs");

const routes = {
    '/': {
        GET: (req, res) => {
            sendResponse(res, {
                body: {
                    message: "Successful"
                }
            })
        }
    },
    '/student': {
        GET: (_req, res) => {
            const raw = fs.readFileSync("./data/db.json");
            const students = JSON.parse(raw);

            sendResponse(res, {
                body: students
            })
        },
        POST: (req, res) => {
            let body = '';

            //event for getting any data
            req.on("data", (chunk) => {
                body += chunk.toString();
            })

            //event ending
            req.on("end", () => {
                // console.log('Data from post method', body);
                const payload = JSON.parse(body);

                const raw = fs.readFileSync("./data/db.json");
                const students = JSON.parse(raw);

                students.push(payload);

                fs.writeFileSync("./data/db.json", JSON.stringify(students)); //JSON.stringify is because raw nodejs does not work directly to object we've to convert it into string but in expressJs we get it behind the scene.
                sendResponse(res, { status: 201, body: { message: body } })
            })
        },
    },
    default: (_req, res) => {
        sendResponse(res, {
            status: 404,
            body: { message: "Resource not found" }
        })
    }
}

const sendResponse = (res, { contentType = "application/json", status = 200, body = {} }) => {
    console.log(body);
    res.writeHead(status, { 'Content-Type': contentType })
    res.write(JSON.stringify(body))
    res.end();
}

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const currentRoute = routes[url] || routes.default;
    const handler = currentRoute[method] || routes.default;

    handler(req, res)
});

server.listen(4000, () => {
    console.log('Server is listening to port 4000 from serverWithDB.js file');
})