const express = require('express');

const routes = express.Router();
const postCtl = require('../controller/postControll')

console.log("Post Route is Working");

routes.get('/',postCtl.add_post);

module.exports = routes;