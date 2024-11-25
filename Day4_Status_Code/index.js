const http = require('http');
const port = 8000;
const fs = require('fs')

const requestHandler = (req, res) => {

    res.writeHead(200,{'content-type': 'text/html'});
    console.log(req.url);
    var filename = '';

    switch(req.url){
        case '/': 
            filename = './home.html';
        break;

        case '/about': 
            filename = './about.html';
        break;

        case '/contact': 
            filename = './contact.html';
        break;

        case '/team': 
            filename = './team.html';
        break;

        default: 
            filename = './404.html';
        break;

    }

    fs.readFile(filename, (err, data) => {
        if(err){
            console.log("Something went wrong",err);
            return false;
        }
        res.end(data);
    })
}

const app = http.createServer(requestHandler);

app.listen(port, (err) => {

    err ? console.log('Error starting server:', err) : console.log(`Server running at on server :${port}`);
    
});