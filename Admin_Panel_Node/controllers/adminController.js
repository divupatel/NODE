const Admin = require('../models/adminModel');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");

// Admin CRUD Module 

module.exports.dashboard = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.render('dashboard', {
                adminData: req.cookies.adminData
            });
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
            return res.render('AddAdmin', {
                adminData: req.cookies.adminData
            });
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
                    GetAdminData,
                    adminData: req.cookies.adminData
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
        if (req.cookies.adminData) {
            let id = req.query.adminId;
            let singleData = await Admin.findById(id);
            if (singleData) {
                console.log("SingleData Found ");
                return res.render('EditAdmin', {
                    singleData,
                    adminData: req.cookies.adminData
                })
            }
            else {
                console.log("SingleData not Found ");
                return res.redirect('back');
            }
        }

    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.editAdmin = async (req, res) => {
    try {
        let singleAdmin = await Admin.findById(req.body.AdminId);
        req.body.name = req.body.fname + " " + req.body.lname
        if (req.file) {

            try {
                let deleteImgPath = path.join(__dirname, '..', singleAdmin.image);
                await fs.unlinkSync(deleteImgPath);
            }
            catch (err) {
                console.log("Image not Found");
            }

            var newImg = Admin.imgPath + '/' + req.file.filename;
            req.body.image = newImg

        }
        else {
            req.body.image = singleAdmin.image
        }

        let updatedData = await Admin.findByIdAndUpdate(req.body.AdminId, req.body);

        if (updatedData) {
            let newAdmin = await Admin.findById(req.body.AdminId);
            let oldAdmin = req.cookies.adminData;

            if (oldAdmin._id === newAdmin.id) {
                res.cookie('adminData', newAdmin);
                return res.redirect('/viewProfile')
            }
            else {
                return res.redirect('/viewAdmin');
            }
        }
        else {
            console.log("Record not Updated...........!");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

// end of Admin CRUD Module 

// Sign in Module 

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

// end Sign in Module 

// profile module 
module.exports.viewProfile = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.render('viewProfile', {
                adminData: req.cookies.adminData
            })
        }
        else {
            return res.redirect('/')
        }

    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}

// end of profile module 

// change password

module.exports.changePassword = async (req, res) => {
    try {
        if (req.cookies.adminData) {
            return res.render('changePassword', {
                adminData: req.cookies.adminData
            })
        }
        else {
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.changeNewPass = async (req, res) => {
    try {
        console.log(req.body);
        let oldData = req.cookies.adminData;
        if (oldData.password == req.body.currentPassword) {
            if (req.body.currentPassword != req.body.newPassword) {
                if (req.body.newPassword == req.body.confirmPassword) {
                    let editPassword = await Admin.findByIdAndUpdate(oldData._id, { password: req.body.newPassword })
                    return res.redirect('/logout');
                }
                else {
                    console.log("OOpsss .... ! New Password and Confirm Password not matched !");
                    return res.redirect('/');
                }
            }
            else {
                console.log("OOpsss .... ! Current Password and New Password not matched !");
                return res.redirect('/');
            }
        }
        else {
            console.log("OOpsss .... ! Old Password and Current Password not matched !");
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}

module.exports.verifyEmail = async (req, res) => {
    try {
        console.log(req.body);
        let singleObj = await Admin.find({ email: req.body.email }).countDocuments();
        let OTP = Math.floor(Math.random() * 1000000);
        if (singleObj == 1) {
            let singleUser = await Admin.findOne({ email: req.body.email });

            res.cookie('otp', OTP);
            res.cookie('email', singleUser.email);


            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "divupatel22199@gmail.com",
                    pass: "msnwfbcldeuftwiz",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const info = await transporter.sendMail({
                from: 'divupatel22199@gmail.com', // sender address
                to: singleUser.email, // list of receivers
                subject: "OTP for Varification✔", // Subject line
                html: `<b>Your OTP is : ${OTP}</b>`, // html body
            });

            console.log("Message sent: %s", info.messageId);

            return res.redirect('/checkOtp');

        }
        else {
            console.log("Invalid Email");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }

}

module.exports.checkOtp = async (req, res) => {
    try {
        return res.render('checkOtp');
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
       
        if (req.body.otp == req.cookies.otp) {
            res.clearCookie('otp');
            return res.redirect('/forgotPass');
        }
        else {
            console.log("Invalid OTP..Please Re-Enter your OTP");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}

module.exports.forgotPass = async (req, res) => {
    try {
        return res.render('forgotPass');
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}

module.exports.verifyPass = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.cookies.email);
        if (req.body.newPass == req.body.confirmPass) {
            let verifyEmail = await Admin.find({email:req.cookies.email}).countDocuments();
            if(verifyEmail == 1){
                let AdminDataNew = await Admin.findOne({email:req.cookies.email});
                let UpdatedPass = await Admin.findByIdAndUpdate(AdminDataNew.id,{password:req.body.newPass});
                if(UpdatedPass){
                    res.clearCookie('email');
                    console.log("Password Updated Successfully ...")
                    return res.redirect('/');
                }
                else{
                    console.log("Something is Wrong");
                    return res.redirect('back');
                }
            }
            else{
                console.log("Email not Found");
                return res.redirect('back');
            }
        }
        else{
            console.log("New Password And Confirm Password is not same !!!!!!!!!");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Err", err);
        return res.redirect('back');
    }
}