const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');


userRouter
.route('/')
.get(getUser) //path specific middleware function
.post(postUser)
.put(updateUser)
.delete(deleteUser)



userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/setCookies')
.get(setCookies)

userRouter
.route('/:id')
.get(getUserById)


async function getUser(req,res){
    // let data  = await userModel.find();
    let data = await userModel.findOne({name:"Vivek"}) 
    res.json({
        data:data
    })
}
async function postUser(req, res) {
    let obj = req.body;
    let user = await userModel.create(obj);

    res.json({
        message: "Post successfully",
        data:user
    })
}
async function updateUser(req, res) {
    let data = req.body
    let user  = await userModel.findOneAndUpdate({email:req.body.email}, data)
    res.json({
        message:"Data updated successfully",
        data : user
    })
}
async function deleteUser(req, res) {
    let user = await userModel.findOneAndDelete({email:"vkg1617@gmail.com"});
    res.json({
        message: "data deleted"
    })
}

function getUserById(req, res){
    console.log(req.params)
    res.json({
       message:"params ",
        params:req.params.id
    })
}

function getCookies(req, res){
    console.log(req.cookies.isLoggedIn);
    res.send("cookie done")
}

function setCookies(req,res){
    res.cookie("isLogged", false, {maxAge:1000*60*60*24, httpOnly:true, secure:true})
    res.send("Cookie has been set")
}


module.exports = userRouter;