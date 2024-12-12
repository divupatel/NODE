const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/db');
const Students = require('./models/Student');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));


app.get('/',async (req,res)=>{
    let stData = await Students.find();
    res.render('home',{
        stData
    })
})

app.post('/insertData',async (req,res)=>{
    console.log(req.body);
    await Students.create(req.body);
    return res.redirect('back');
});

app.get('/deleteData', async (req,res)=>{
    console.log(req.query);
    await Students.findByIdAndDelete(req.query.id);
    return res.redirect('back');
})

app.get('/editData/:id', async(req,res)=>{
    let singleObj = await Students.findById(req.params.id);
    return res.render('editData',{
       singleObj 
    })

}) 

app.post('/updateData', async (req, res)=>{
    console.log(req.body.stID);
    await Students.findByIdAndUpdate(req.body.stID,req.body);
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})