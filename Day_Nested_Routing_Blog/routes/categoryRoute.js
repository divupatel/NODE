const express = require('express');
const routes = express.Router();

const CategoryCtl = require('../controllers/categoryController')

routes.get('/',CategoryCtl.addCategory);

routes.post('/insertCategory',CategoryCtl.insertCategory);

routes.get('/viewcategory',CategoryCtl.viewcategory);

// routes.get('/deleteCategory/:id',CategoryCtl.deletecategory);

module.exports = routes;