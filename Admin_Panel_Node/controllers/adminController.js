const Admin = require('../models/adminModel');
const fs = require('fs');
const path = require('path');

module.exports.dashboard = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.render('dashboard');
        }
        else {
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addAdmin = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.render('AddAdmin');
        }
        else {
            return res.redirect('/')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.viewAdmin = async (req, res) => {
    try {        
        if (req.cookies.adminData) {
            let GetAdminData = await Admin.find();
            if (GetAdminData) {
                console.log("Data found successfully")
                return res.render('ViewAdmin', {
                    GetAdminData
                });
            }
            else {
                console.log("Data not found")
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.insertAdmin = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);

        var adminImage = '';
        if (req.file) {
            adminImage = Admin.imgPath + '/' + req.file.filename;
        }
        req.body.image = adminImage;
        req.body.name = req.body.fname + ' ' + req.body.lname;

        let AdminData = await Admin.create(req.body);
        if (AdminData) {
            console.log("Data Added Successfully");
            return res.redirect('back');
        }
        else {
            console.log("Data Added Successfully");
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let getAdmin = await Admin.findById(id);
        if (getAdmin) {
            try {
                let deleteImgPath = path.join(__dirname, '..', getAdmin.image);
                await fs.unlinkSync(deleteImgPath);
            }
            catch (err) {
                console.log("Image not found")
            }

            let deleteRecord = await Admin.findByIdAndDelete(id);
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

module.exports.updateAdmin = async (req, res) => {
    try {
        let id = req.query.adminId;
        let singleData = await Admin.findById(id);
        if (singleData) {
            console.log("SingleData Found ");
            return res.render('EditAdmin', {
                singleData
            })
        }
        else {
            console.log("SingleData not Found ");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.editAdmin = async (req, res) => {
    try {
        req.body.name = req.body.fname + " " + req.body.lname
        let singleAdmin = await Admin.findById(req.body.AdminId);
        if (req.file) {
            if (singleAdmin) {
                try {
                    let deleteImgPath = path.join(__dirname, '..', singleAdmin.image);
                    await fs.unlinkSync(deleteImgPath);
                }
                catch (err) {
                    console.log("Image not Found");
                }

                var newImg = Admin.imgPath + '/' + req.file.filename;
                req.body.image = newImg

                let updatedData = await Admin.findByIdAndUpdate(req.body.AdminId, req.body);
                if (updatedData) {
                    console.log("Record Updated With Image Successfully..... ! ");
                    return res.redirect('/viewAdmin');
                }
                else {
                    console.log("Something is wrong");
                    return res.redirect('back')
                }
            }
        }
        else {
            if (singleAdmin) {
                req.body.image = singleAdmin.image
            }
            let updatedData = await Admin.findByIdAndUpdate(req.body.AdminId, req.body);
            if (updatedData) {
                console.log("Record Updated Successfulllyyyy.....!");
                return res.redirect('/viewAdmin');
            }
            else {
                console.log("Record not Updated...........!");
                return res.redirect('back')
            }

        }

    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.signIn = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.redirect('/dashboard');
        }
        else {
            res.render('signIn')

        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.checkSignIn = async (req, res) => {
    try {
        let isAdmin = await Admin.find({ email: req.body.email }).countDocuments();
        if (isAdmin == 1) {
            let isAdminExist = await Admin.findOne({ email: req.body.email });
            if (isAdminExist.password == req.body.password) {
                // console.log("Email & Password is matched successfullyy...");
                res.cookie('adminData', isAdminExist)
                return res.redirect('/dashboard');
            }
            else {
                console.log("Invalid Password");
                return res.redirect('back');

            }
        }
        else {
            console.log("Invalid Email")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}