const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dailyTask = [
    {
        task : 'node exam',
        type : 'Pending',
        date : new Date().toLocaleDateString()
    },
]

app.get('/', (req, res) =>{
    res.render('home',
        {
            dailyTask
        });
});

app.post('/insertData',(req, res) =>{
    console.log(req.body);
    dailyTask.push(req.body);
    res.redirect('/');
})

app.get('/deleteTask', (req, res) => {
    console.log(req.query);
    dailyTask.splice(req.query.pos,1);
    res.redirect('/');
})


app.listen(port,(err)=>{
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})