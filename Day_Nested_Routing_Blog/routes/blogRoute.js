const express = require('express');
const routes = express.Router();
const Blogs = require('../model/blogModel')
const BlogCtl = require('../controllers/blogController');

// console.log("Blog Routing");

routes.get('/',BlogCtl.addBlog);
routes.post('/insertBlog',Blogs.uploadBlogImage,BlogCtl.insertBlog);
routes.get('/viewblog',BlogCtl.viewblog);
routes.get('/deleteBlog/:id',BlogCtl.deleteBlog);
routes.get('/updateBlog',BlogCtl.updateBlog);

routes.post('/editBlog',Blogs.uploadBlogImage,BlogCtl.editBlog);

module.exports = routes;