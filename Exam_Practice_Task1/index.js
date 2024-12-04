const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Setting up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Array to store tasks
let newTask = ['todo practice','Learn Node'];
let completedTasks = ['todo practice'];

// Home route - Render tasks
app.get('/', (req, res) => {
    res.render('home', { newTask , completedTasks });
});

// Insert new task
app.post('/insertData', (req, res) => {
    const task = req.body.task;
    if (task.trim()) {
        newTask.push(task.trim());
    }
    res.redirect('/');
});

app.get('/deleteTask', (req, res) => {
    newTask.splice(req.query.pos,1);
    res.redirect('/');
})

app.get('/completedTask', (req, res)=>{
    // console.log(req.query);
    const pos = parseInt(req.query.pos);
    completedTasks.push(newTask[pos]);  // Add it to the completedTasks array
    res.redirect('/');
})

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log('Something went wrong:', err);
        return;
    }
    console.log(`Server is running at ${port}`);
});
