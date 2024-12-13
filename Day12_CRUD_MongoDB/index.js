const express = require('express');
const port = 8000;

const app = express();
const path = require('path');
const db = require('./config/db');
const Employee = require('./models/employee');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));


app.get('/',async (req,res)=>{
    res.render('home')
})

app.post('/insertData',Employee.uploadImageFile,async (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    // await Employee.create(req.body);
    // return res.redirect('/viewemp');

})

app.get('/viewemp',async (req,res)=>{
    let empData = await Employee.find();
    res.render('view_emp',{
        empData
    })
})

app.get('/deleteData',async (req,res)=>{
    console.log(req.query.empId);
    await Employee.findByIdAndDelete(req.query.empId);
    return res.redirect('back');
})

app.get('/updateData/:id', async (req, res) => {
    console.log(req.params.id);
    let singleObj = await Employee.findById(req.params.id);
    console.log(singleObj);
    return res.render('edit_emp', {
        singleObj
    })
})

app.post('/editData', async (req, res) => {
    console.log(req.body);
    console.log(req.body.empId);
    await Employee.findByIdAndUpdate(req.body.empId, req.body);
    return res.redirect('/viewemp');
})

app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})