const express = require('express')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../secrets');


module.exports.signupUser = async function signupUser(req, res) {
    try{
        let data = req.body;
        let resp = await userModel.create(data);
        if(resp){
            res.json({
                message: "user signed up",
                data: resp
            });
        }else{
            res.json({
                message: "error in signing up",
                data: resp
            });
        }    
    }catch(err){
        res.json({
            message: err.message
        })
    }   
}

module.exports.forgetpassword = async function forgetpassword(req, res){
    let email = req.body;

    try{
        const user = await userModel.findOne({email : email});
        if(user){
            const resetToken = user.createResetToken();
            //http://abc.com/forgetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.getHost}/resetpassword/${resetToken}`;
            //send email to user
            //nodemail  
        }else{
            res.json({
                message:"no such user found"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.resetpassword = async function resetpassword(req, res){
   try{
    const token = req.params.token;
    let {password, cpassword} = req.body;
    const user = await userModel.findOne({token: token});
    if(user){
        user.resetPasswordHandler(password, cpassword);
        await user.save();
        res.json({
            message: "User password changed successfully please login again"
        })
    }else{
        res.json({
            message: "User not found"
        })
    }
  
   }catch(err){
    res.json({
        message: err.message
    })
   }
  
}

module.exports.loginUser = async function loginUser(req, res) {
    try {
        let data = req.body;
        let user = await userModel.findOne({
            email: data.email
        })
        if (user) {
            if (user.password === data.password) {
                
                let uid = user['_id'];
                let token = jwt.sign({payload:uid}, JWT_KEY);
                res.cookie("isLogIn", token);
                res.send("Welcome User")
            } else {
                res.send("Credentials are wrong")
            }
        } else {
            res.send("User not found")
        }

    } catch (err) {
       res.json({
           message:err.message
       })
    }
}

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)===true){
            next();
        }else{
            res.status(401).json({
                message: "Operation not allowed"
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next){
    try{
        let token;
        if(req.cookies.isLogIn){
            token = req.cookies.isLogIn;
            let {payload} = jwt.verify(req.cookies.isLogIn, JWT_KEY);
            if(payload){
                let user = await userModel.findById(payload);
                req.body.role = user.role;
                req.body.id = user.id; 
                next();
            }else{
                res.json({
                    message:"User error"
                })
            } 
        }else{
            res.json({
                message: "Please Login Again"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }   
}

module.exports.logout = async function logout(req, res){
    res.cookie('isLogIn', '', {maxAge:1});
    res.json({
        message:"User logout successfully"
    })
} 