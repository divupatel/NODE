const http = require('http');
const port = 8000;
const fs = require('fs')

const requestHandler = (req, res) => {
    fs.readFile('./home.html', (err, data) => {
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