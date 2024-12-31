const express = require('express');
const routes = express.Router();

const AdminCtl = require('../controllers/adminController');
const Admin = require('../models/adminModel');

routes.get('/',AdminCtl.signIn);
routes.post('/checkSignIn',AdminCtl.checkSignIn);

routes.get('/dashboard',AdminCtl.dashboard);

routes.get('/addAdmin',AdminCtl.addAdmin);
routes.get('/viewAdmin',AdminCtl.viewAdmin);
routes.post('/insertAdmin',Admin.uploadAdminImg,AdminCtl.insertAdmin);
routes.get('/deleteAdmin/:id',AdminCtl.deleteAdmin);
routes.get('/updateAdmin',AdminCtl.updateAdmin);
routes.post('/editAdmin',Admin.uploadAdminImg,AdminCtl.editAdmin);



module.exports = routes;