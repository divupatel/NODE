const Employee = require('../models/employee')
const fs = require('fs');
const path = require('path');
module.exports.home = (req,res)=>{
    res.render('home')
}

module.exports.insertData = async (req,res)=>{
    var imagePath = '';
    if (req.file) {
        imagePath = Employee.imgPath+'/'+req.file.filename;
    }
    req.body.image = imagePath;
    await Employee.create(req.body);
    return res.redirect('/viewemp');
}

module.exports.viewemp = async(req,res)=>{
    let empData = await Employee.find();
    return res.render('view_emp', {
        empData
    });
}

module.exports.deleteData = async(req,res)=>{
    let id = req.query.empId;
    let singleData = await Employee.findById(id);
    const deletePath = path.join(__dirname,'..',singleData.image);

    if (deletePath) {
        try {
            fs.unlinkSync(deletePath);
        }
        catch (err) {
            console.error('Error deleting file:', err);
        }
    }
    await Employee.findByIdAndDelete(id);

    return res.redirect('back');
}

module.exports.updateData = async(req,res)=>{
    let singleObj = await Employee.findById(req.params.id);
    return res.render('edit_emp', {
        singleObj
    })
}

module.exports.editData = async(req,res)=>{
    let singleData = await Employee.findById(req.body.empId);
    if(req.file){
        // delete old image
        try{
            let imgOldPath = path.join(__dirname,'/',singleData.image);
            await fs.unlinkSync(imgOldPath);

        }
        catch(err){
            console.error('Error deleting old file:', err);
        }

        // update new image path
        var newImgPath = Employee.imgPath+'/'+req.file.filename;
        req.body.image = newImgPath;
        await Employee.findByIdAndUpdate(req.body.empId, req.body);
        return res.redirect('/viewemp');
    }
    else{
        req.body.image = singleData.image;
        await Employee.findByIdAndUpdate(req.body.empId, req.body);
        return res.redirect('/viewemp');
    }

}