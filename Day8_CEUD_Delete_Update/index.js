const express = require('express');
const port = 8001;
const app = express();
const path = require('path');

const stData = [
    {
        name: 'Divya',
        email: 'divya@gmail.com'
    },
    {
        name: 'Srushti',
        email: 'srushti@gmail.com'
    }
]

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req,res)=>{
    res.render('home',{
        stData : stData
    });
})

app.post('/insertData',(req,res)=>{
    console.log(req.body);
    stData.push(req.body);
    res.redirect('/');
})

app.get('/deleteData',(req,res)=>{
    stData.splice(req.query.pos,1);
    res.redirect('/');
})

app.get('/editData',(req,res)=>{
    console.log(req.query);
    let eData = stData[req.query.pos];
    res.render('edit',{
        eData
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong",err);
        return false;
    }
    console.log(`Server is running at ${port}`);
});