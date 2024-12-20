const express = require('express');

const routes = express.Router();

const UniCtl = require('../controllers/universityController');


routes.get('/', UniCtl.AddUniversity);

routes.use('/college',require('./collegeRoute'));

routes.use('/faculty',require('./facultyRoute'));

module.exports = routes;