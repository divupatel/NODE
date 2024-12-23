const Blog = require('../model/blogModel');
const Blogs = require('../model/blogModel')


module.exports.addBlog = (req,res)=>{
    return res.render('blogs/AddBlog');
}

module.exports.insertBlog = async (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    var newImage = '';
    if(req.file){
        newImage = Blogs.imgPath+'/'+req.file.filename;
    }
    req.body.image = newImage;

    await Blog.create(req.body);
    return res.redirect('back');

}

module.exports.viewblog = async (req,res)=>{
    let ViewBlog = await Blog.find();
    return res.render('Blogs/ViewBlog', { 
        ViewBlog
    });
}