const express = require('express');
const userRouter = express.Router();
const {getUser, updateUser, deleteUser, getAllUser} = require('../Controller/userController');
const {resetpassword, forgetpassword, loginUser, signupUser, protectRoute, isAuthorised, logout} = require('../Controller/authController');
//user options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/login')
.post(loginUser)

userRouter
.route('/logout')
.get(logout)

userRouter
.route('/signup')
.post(signupUser)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

// //profile page
// app.use(protectRoute)
userRouter
.route('/userProfile')
.get(protectRoute, getUser)

//admin specific function
userRouter
.route('/')
.get(isAuthorised(["admin"]), getAllUser)
module.exports = userRouter;