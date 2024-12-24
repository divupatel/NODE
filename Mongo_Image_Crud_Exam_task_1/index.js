const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/db');
const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.get('/',async (req,res)=>{
    res.render('home')
})

app.listen(port,(err)=>{
    if(err){
        console.log("Error starting server",err);
        return false;
    }
    console.log("Server is running on port :" ,port);
});