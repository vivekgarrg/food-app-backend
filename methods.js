const express = require('express')

const app = express()

app.use(express.json()) //global middleware function 

app.listen(3000);

let users = [{
    id: 1,
    name: "vivek"
},
{
    id:2,
    name:"Hello"
} ]

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/users',userRouter) //global middleware function
app.use('/auth',authRouter)

userRouter
.route('/')
.get(getUser) //path specific middleware function
.post(postUser)
.put(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

authRouter
.route('/signup')
.get(getSignUp)
.post(middleware,postSignUp)

function middleware(req,res,next){
    console.log("middleware function is called")
    next();
}

function getUser(req,res){
    res.send(users[0])
}
function postUser(req, res) {
    console.log(req.body.name)
    res.json({
        message: "Post successfully"
    })
}
function updateUser(req, res) {
    for (key in req.body) {
        users[key] = req.body[key]
    }
    res.send(users)
}
function deleteUser(req, res) {
    users = {}
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

function getSignUp(req, res){
    res.sendFile('/public/index.html', {root:__dirname});
}
function postSignUp(req,res){
    let data = req.body;
    console.log("post signup func is called")
    res.json({
        message:"user signed up",
        data: data
    });
}