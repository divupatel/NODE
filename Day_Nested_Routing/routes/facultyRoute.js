const express = require('express');

const routes = express.Router();
const FacultyCtl = require('../controllers/facultyController')

routes.get('/',FacultyCtl.AddFaculty);

module.exports = routes;