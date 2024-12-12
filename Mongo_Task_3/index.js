const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/db');
const Rate = require('./models/Rate');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));


app.get('/',async (req,res)=>{
    let RateData = await Rate.find()
    res.render('home',{
        RateData
    })
})

app.post('/insertData', async (req,res)=>{
    console.log(req.body);
    await Rate.create(req.body);
    return res.redirect('/');
})

app.get('/deleteData', async (req,res)=>{
    console.log(req.query);
    await Rate.findByIdAndDelete(req.query.id);
    return res.redirect('/');
})

app.get('/updateData', async (req, res) => {
    console.log(req.query);
    let singleObj = await Rate.findById(req.query.id);
    return res.render('editData',{
        singleObj
    })
})

app.post('/editData', async (req,res) => {
    await Rate.findByIdAndUpdate(req.body.rtId,req.body);
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})