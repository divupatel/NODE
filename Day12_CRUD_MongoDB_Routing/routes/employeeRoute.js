const express = require('express');
const routes = express.Router();

const empCtl = require('../controller/employeeControll');

const Employee = require('../models/employee')

console.log("Routing is working")

routes.get('/',empCtl.home);

routes.post('/insertData', Employee.uploadImageFile, empCtl.insertData);

routes.get('/viewemp', empCtl.viewemp);

routes.get('/deleteData', empCtl.deleteData);

routes.get('/updateData/:id', empCtl.updateData);

routes.post('/editData',Employee.uploadImageFile, empCtl.editData);

module.exports = routes;