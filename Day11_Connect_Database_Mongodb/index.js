const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/db');
const Employee = require('./models/Employee');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());


app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/insertData',async (req,res)=>{
    console.log(req.body);
    await Employee.create(req.body);
    return res.redirect('back');

})

app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})