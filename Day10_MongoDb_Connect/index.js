const express = require('express');
const port = 8000;

const app = express();

const db = require('./config/db');

app.listen(port,(err) => {
    if(err){
        console.log('Error starting server:',err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
});