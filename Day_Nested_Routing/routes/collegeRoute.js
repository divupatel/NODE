const express = require('express');

const routes = express.Router();

const CollegeCtl = require('../controllers/collegeController');

routes.get('/',CollegeCtl.AddCollege);

module.exports = routes;