const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../../models/AdminModel');


module.exports.adminRegister = async (req,res)=>{
    try{
        let adminEmailExist = await Admin.findOne({email:req.body.email});
        if(!adminEmailExist){
            if(req.body.password == req.body.confirmPassword){
                req.body.password = await bcrypt.hash(req.body.password,10);
                let addAdmin = await Admin.create(req.body);
                if(addAdmin){
                    return res.status(200).json({msg:"Admin Data addedd Successfully",data:addAdmin});
                }
                else{
                    return res.status(400).json({msg:"Can not add Data"});
                }
            }
            else{
                return res.status(400).json({msg:"password and confirm password are not same"});
            }
        }
        else{
            return res.status(400).json({msg:"Email already Exists"});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something is wrong",errors:err});
    }
}

module.exports.adminLogin = async (req,res)=>{
    try{
     let checkAdmin = await Admin.findOne({email : req.body.email});
     if(checkAdmin){
        let checkPass = await bcrypt.compare(req.body.password,checkAdmin.password);
        if(checkPass){
            checkAdmin = checkAdmin.toObject();
            delete checkAdmin.password;
            console.log(checkAdmin,"delete")
            let adminToken = await jwt.sign({adminData : checkAdmin},'Divu',{expiresIn:'1d'});
            return res.status(200).json({msg:"Logged in Successfully",Token : adminToken});
        }
        else{
            return res.status(400).json({msg:"Invalid Password"});
        }
     }
     else{
         return res.status(400).json({msg:"Invalid Email"});
     }
    }
    catch(err){
        return res.status(400).json({msg:"Something is wrong",errors:err});
    }
}