const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRouter = require('./protectRouter')
const {getUser, postUser, updateUser, deleteUser, getUserById, getCookies, setCookies} = require('../Controller/userController')


userRouter
.route('/')
.get(protectRouter, getUser) //path specific middleware function
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



module.exports = userRouter;