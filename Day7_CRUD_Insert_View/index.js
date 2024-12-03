const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

const stData = [
    {
        first_name: 'Divya',
        last_name:'John',
        email: 'divya@gmail.com',
        gender: 'Female',
        age: 26,
        city:'Surat',
        hobby: 'Reading',
        about:'lorem ipsum dolor sit amet, consectetur adipiscing elit'

    },
    {
        first_name: 'Srushti',
        last_name:'John',
        email: 'srushti@gmail.com',
        gender: 'Female',
        age: 26,
        city:'Surat',
        hobby: 'Reading',
        about:'lorem ipsum dolor sit amet, consectetur adipiscing elit'

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
    // console.log(req.body);
    stData.push(req.body);
    res.redirect('/');
})

app.get('/deleteData',(req,res)=>{
    stData.splice(req.query.pos,1);
    res.redirect('/');
})

app.get('/editData',(req,res)=>{
    // console.log(req.query);
    let eData = stData[req.query.pos];
    res.render('edit',{
        eData,
        position : req.query.pos
    })
    res.redirect('/');
})

app.post('/updateData',(req,res)=>{
    console.log(req.body);
    stData[req.body.position] = req.body
    res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong",err);
        return false;
    }
    console.log(`Server is running at ${port}`);
});