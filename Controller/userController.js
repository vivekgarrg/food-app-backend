const { findByIdAndDelete } = require("../models/userModel");
const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req,res){
    let id = req.body.id;
    let data = await userModel.findById(id);
    if(data){
        res.json({
            data:data
        })
    }else{
        res.json({
            message:"User not found"
        })
    }   
}
module.exports.updateUser =async function updateUser(req, res) {
    try{   
        let id = req.params.id;
        let data = req.body;
        let user  = await userModel.findByIdAndUpdate(id, data);
        if(user){
            res.json({
                message:"Data updated successfully",
                data : user
            })
        }else{
            res.json({
                message:"User not found"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res){
    try{
        const id = req.params.id;
        let data = await userModel.findByIdAndDelete(id);
        if(data){
            res.json({
                message:"deleted",
                data : data
            })
        }else{
            res.json({
                message:"User Not Found"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.getAllUser = async function getUserById(req, res){
   let data = await userModel.find();
   if(data){
    res.json({
        data: data
    });
    }else{
        res.json({
            message: "Not allowed"
        });
    }
}

