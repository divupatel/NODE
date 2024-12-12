const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/db');
const User = require('./models/user');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));


app.get('/', async (req,res)=>{
    let userData = await User.find();
  res.render('home',{
    userData
  })
});

app.post('/insertData', async (req, res)=>{
    // console.log(req.body);
    await User.create(req.body);
    return res.redirect('back');
});

app.get('/deleteData', async (req,res)=>{
  // console.log(req.query);
  await User.findByIdAndDelete(req.query.id);
  return res.redirect('back');
})

app.get('/editData', async (req, res) => {
  // console.log(req.query);
  let singleObj = await User.findById(req.query.id);
  // console.log(singleObj);
  return res.render('edit', {
    singleObj
  })
})

app.post('/updateData', async (req,res) => {
  // console.log(req.body);
  // console.log(req.body.userID);
  await User.findByIdAndUpdate(req.body.userID,req.body);
  return res.redirect('/');
});
app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
});