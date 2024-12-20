const express = require('express');

const port = 8000;

const app = express();
const path = require('path')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes/universityRoute'));

app.listen(port,(err)=>{
    err?console.log(err):console.log("server is running on port",port);
})