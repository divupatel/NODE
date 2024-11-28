const express = require('express');
const port = 8000;

const app = express();

const path = require('path');

const studentData = [{name : 'Divya',email : 'divya@gmail.com'}];

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    res.render('home',{
        'data' : studentData
    });
})

app.post('/insertData',(req,res)=>{
    console.log(req.body);
    const newStudent = {
        name: req.body.name,
        email : req.body.email,
        age : req.body.age
    }
    studentData.push(newStudent);
    res.redirect('/');

})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong",err);
        return false;
    }
    console.log(`Server is running at ${port}`);
})