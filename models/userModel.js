const mongoose  = require('mongoose');
const emailValidator  = require('email-validator')
const bcrypt = require('bcrypt')
 
const db_link = "mongodb+srv://admin:6EiTkZzKKqRdnxna@cluster0.sabdy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected")
})
.catch(function(err){
    console.log(err);
});

//schema

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        minLength: 8
    },
    cpassowrd:{
        type:String,
        required:true,
        minLength: 8,
        validate: function(){
            this.cpassowrd===this.password
        }
    }
});


//mongo hooks ---->

userSchema.pre('save', function(){
    this.cpassowrd = undefined;
})

//encrypting passowrd

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })



// userSchema.pre('save',function(){
//     console.log("before saving in database", this);
// })
// userSchema.post('save',function(doc){
//     console.log("after saving into db", doc);
// })

//model--->
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;


// (async function createUser(){
//     let user = {
//         name:"Vivek",
//         email:"vkg1617@gmail.com",
//         passowrd:"abc123",
//         cpassowrd:"abc123"
//     }

//     let data  = await userModel.create(user);
//     console.log(data);
// })();


