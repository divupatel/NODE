const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const db = require('./config/db');
const Books = require('./models/book.js');


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.get('/',async (req,res)=>{
    let bookData = await Books.find();
    res.render('home',{
        bookData
    })
})

app.post('/inserData', Books.uploadImgFile,async (req,res)=>{
    var imgPath = '';
    imgPath = Books.imgPath+'/'+req.file.filename;
    req.body.image = imgPath;
    await Books.create(req.body);
    return res.redirect('back');
})

app.get('/details', async (req, res) => {
    let singleData = await Books.findById(req.query.id);
    console.log(singleData);
    res.render('view_details',{
        singleData
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Error starting server",err);
        return false;
    }
    console.log("Server is running on port :" ,port);
}); 