const { name } = require('ejs');
const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const title = "This is a testing Home Page";
const data = "Student Data"
const student1 = {name:"Divya",age:20}
const array = [{name:"Divya",age:20},{name:"Srushti",age:23},{name:"Ayushi",age:21}]
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/', (req, res) => {
    res.render('home',{
        "title": title,
        "data": data,
        "student": student1,
        "array": array
    });
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong",err);
        return false;
    }
    console.log(`Server is running at ${port}`);
})