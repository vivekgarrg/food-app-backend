const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()) //global middleware function 

app.listen(3000);


const userRouter = require('./Router/userRouter')
const planRouter = require('./Router/planRouter')
app.use(cookieParser())
app.use('/users', userRouter)
app.use('/plans', planRouter)








