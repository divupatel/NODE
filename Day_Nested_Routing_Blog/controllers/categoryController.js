const Category = require('../model/categoryModel');

module.exports.addCategory = (req, res) => {
    try {
        return res.render('Category/AddCategory');
    }
    catch (err) {
        console.log("Err in opening page")
        return res.redirect('back');
    }
}

module.exports.insertCategory = async (req, res) => {
    try {
        let categoryData = await Category.create(req.body);
        if (categoryData) {
            console.log("Data added Successfully");
            return res.redirect('/category/viewcategory');
        }
        else {
            console.log("Data not found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Something is Wrong");
        return res.redirect('back');
    }


}

module.exports.viewcategory = async (req, res) => {
    try {

        let search = '';
        if (req.query.categorySearch) {
            search = req.query.categorySearch
        }

        let perPage = 3;
        let page = 0;

        if (req.query.page) {
            page = req.query.page
        }

        let categoryData = await Category.find(
            { categoryName: { $regex: search } }
        ).skip(page * perPage).limit(perPage);

        let totalRecords = await Category.find(
            { categoryName: { $regex: search } }
        ).countDocuments();

        let totalCounts = Math.ceil((totalRecords / perPage));



        if (categoryData) {
            return res.render('Category/ViewCategory', {
                categoryData, search,
                totalCounts, page
            })
        }
        else {
            console.log("Category Data not found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("view catch err", err);
        return res.redirect('back');
    }
}
