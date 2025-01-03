const express = require('express');
const routes = express.Router();

const AdminCtl = require('../controllers/adminController');
const Admin = require('../models/adminModel');

// login routes
routes.get('/', AdminCtl.signIn);
routes.post('/checkSignIn', AdminCtl.checkSignIn);
routes.get('/logout', (req, res) => {
    res.clearCookie('adminData');
    return res.redirect('/');
})
// end of login routes 

// profile routes 
routes.get('/viewProfile',AdminCtl.viewProfile);
// end of profile routes 

// change password
routes.get('/changePassword',AdminCtl.changePassword);
routes.post('/changeNewPass',AdminCtl.changeNewPass);
// end of change password

// forgot password
routes.get('/checkEmail', (req,res)=>{
   return res.render('checkEmail');
});
routes.post('/verifyEmail',AdminCtl.verifyEmail);
routes.get('/checkOtp',AdminCtl.checkOtp);
routes.post('/verifyOtp',AdminCtl.verifyOtp);
routes.get('/forgotPass',AdminCtl.forgotPass);
routes.post('/verifyPass',AdminCtl.verifyPass);

// end of forgot Password

// main 

routes.get('/dashboard', AdminCtl.dashboard);

routes.get('/addAdmin', AdminCtl.addAdmin);
routes.get('/viewAdmin', AdminCtl.viewAdmin);
routes.post('/insertAdmin', Admin.uploadAdminImg, AdminCtl.insertAdmin);
routes.get('/deleteAdmin/:id', AdminCtl.deleteAdmin);
routes.get('/updateAdmin', AdminCtl.updateAdmin);
routes.post('/editAdmin', Admin.uploadAdminImg, AdminCtl.editAdmin);

// emd of main


module.exports = routes;