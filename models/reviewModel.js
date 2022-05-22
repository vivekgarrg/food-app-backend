const mongoose  = require('mongoose');
const db_link = "mongodb+srv://admin:6EiTkZzKKqRdnxna@cluster0.sabdy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log("review database connected")
})
.catch(function(err){
    console.log(err);
});

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        required:[true, 'rating is required'],
        min:1,
        max:10
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        required:[true, 'user is required']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"planModel",
        required:[true, 'plan is required']
    }
})

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:"user",
        select:"name profileImage"
    }).populate({path:"plan"});
    next();
});

const reviewModel = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel;