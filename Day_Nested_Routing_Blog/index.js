const express = require('express');

const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/mongoose');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

// app.use('/',require('./routes/universityRoute'));
app.use('/blogs',require('./routes/blogRoute'))
app.use('/category',require('./routes/categoryRoute'))

app.listen(port,(err)=>{
    err?console.log(err):console.log("server is running on port",port);
}) 