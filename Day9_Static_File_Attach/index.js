const express = require('express');
const port = 8000;

const app = express();

const path = require('path');

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use((req, res, next) => {
    console.log("first request");
    next();
})

app.use((req, res, next) => {
    console.log("second request");
    next();
})
app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong",err);
        return false;
    }
    console.log(`Server is running at ${port}`);
});