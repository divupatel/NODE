const Blogs = require('../model/blogModel');
const Category = require('../model/categoryModel');
const path = require('path');
const fs = require('fs');
const Blog = require('../model/blogModel');


module.exports.addBlog = async (req, res) => {
    try {
        let categoryData = await Category.find();
        if (categoryData) {
            return res.render('blogs/AddBlog', {
                categoryData
            });
        }
        else {
            console.log("category data not found")
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log("Err in Blog ");
        return res.redirect('back');
    }
}

module.exports.insertBlog = async (req, res) => {

    try {
        var newImage = '';
        if (req.file) {
            newImage = Blogs.imgPath + '/' + req.file.filename;
        }
        req.body.image = newImage;

        await Blog.create(req.body);
        return res.redirect('/blogs/viewblog');
    }
    catch (err) {
        console.log("Error occuring in inserting Data");
        return res.redirect('back');
    }

}

module.exports.viewblog = async (req, res) => {
    try {

        var search = '';
        if (req.query.blogSearch) {
            search = req.query.blogSearch
        }

        let perPage = 2;
        let page = 0;

        if(req.query.page){
            page = req.query.page
        }

        let BlogData = await Blog.find({
            $or: [
                { author: { $regex: search } },
                { title: { $regex: search } }
            ]
        }).skip(page*perPage).limit(perPage).populate('categoryId').exec();

        let totalRecord = await Blog.find({
            $or: [
                { author: { $regex: search } },
                { title: { $regex: search } }
            ]
        }).countDocuments();

        // console.log(totalRecord)
        let totalCounts = Math.ceil((totalRecord/perPage));
        console.log(totalCounts)

        if (BlogData) {
            return res.render('Blogs/ViewBlog', {
                BlogData,
                search,
                totalCounts,
                page
            });
        }
        else {
            console.log("Data not found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error occuring in view Data", err);
        return res.redirect('back');
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let getBlog = await Blog.findById(id);
        if (getBlog) {
            try {
                let deleteImgPath = path.join(__dirname, '..', getBlog.image);
                await fs.unlinkSync(deleteImgPath);
            }
            catch (err) {
                console.log("Image not found")
            }

            let deleteRecord = await Blog.findByIdAndDelete(id);
            if (deleteRecord) {
                console.log("Record deleted successfully");
                return res.redirect('back');
            }
            else {
                console.log("Something went wrong");
                return res.redirect('back');
            }

        }
        else {
            console.log("Record not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.updateBlog = async (req, res) => {
    try {
        let id = req.query.blogId;
        let singleBlog = await Blog.findById(id);
        let categoryData = await Category.find();
        if (singleBlog) {
            return res.render('Blogs/EditBlog', {
                singleBlog, categoryData
            })
        }
        else {
            console.log("Record not found");
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log("Something is wrong");
        return res.redirect('back');
    }
}

module.exports.editBlog = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        if (req.file) {
            let singleBlog = await Blog.findById(req.body.bId);
            if (singleBlog) {
                try {
                    let deleteImgPath = path.join(__dirname, '..', singleBlog.image);
                    await fs.unlinkSync(deleteImgPath);
                }
                catch (err) {
                    console.log("Image not Found");
                }

                var newImg = Blog.imgPath + '/' + req.file.filename;
                req.body.image = newImg

                let updatedData = await Blog.findByIdAndUpdate(req.body.bId, req.body);
                if (updatedData) {
                    console.log("Record Updated With Image Successfully..... ! ");
                    return res.redirect('/blogs/viewblog');
                }
                else {
                    console.log("Something is wrong");
                    return res.redirect('back')
                }
            }
        }
        else {
            let singleBlog = await Blog.findById(req.body.bId);
            if (singleBlog) {
                req.body.image = singleBlog.image;
            }

            let updatedData = await Blog.findByIdAndUpdate(req.body.bId, req.body);
            if (updatedData) {
                console.log("Record Updated Successfulllyyyy.....!");
                return res.redirect('/blogs/viewblog');
            }
            else {
                console.log("Record not Updated...........!");
                return res.redirect('back')
            }
        }

    }
    catch (err) {
        console.log("Something is wrong");
        return res.redirect('back');
    }
}