const http = require('http');
const port = 9000;
const fs = require('fs');

const requestHandler = (req, res) => {

    res.writeHead(200, { 'content-type': 'text/html' });
    console.log(req.url);
    let filename = '';

    switch (req.url) {
        case '/':
            filename = './home.html'
            break;

        case '/about':
            filename = './about.html'
            break;

            case '/contact' :
            filename = './contact.html'
            break;

            case '/team' :
            filename = './team.html'
            break;
            
            default :
            filename = './home.html'
            break;

    }

    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log("Something went wrong", err);
            return false;
        }
        res.end(data);
    })
}

const app = http.createServer(requestHandler);

app.listen(port, (err) => {
    if (err) {
        conso
        le.log("Something went wrong");
    }
    console.log(`Server is running at ${port}`);
})