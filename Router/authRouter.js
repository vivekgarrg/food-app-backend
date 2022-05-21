const express = require('express')
const authRouter = express.Router();
const userModel = require('../models/userModel');

authRouter
    .route('/signup')
    .get(getSignUp)
    .post(middleware, postSignUp)

authRouter
    .route('/login')
    .post(loginUser)


//middleware function
function middleware(req, res, next) {
    console.log("middleware function is called")
    next();
}


function getSignUp(req, res) {
    res.sendFile('/public/index.html', {
        root: __dirname
    });
}
async function postSignUp(req, res) {
    let data = req.body;
    let resp = await userModel.create(data);
    res.json({
        message: "user signed up",
        data: resp
    });
}

async function loginUser(req, res) {
    try {
        let data = req.body;
        let user = await userModel.findOne({
            email: data.email
        })
        if (user) {
            if (user.password === data.password) {
                res.status(400).send("Welcome User")
            } else {
                res.send("Credentials are wrong")
            }
        } else {
            res.send("User not found")
        }

    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = authRouter;