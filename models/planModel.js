const mongoose  = require('mongoose');
const db_link = "mongodb+srv://admin:6EiTkZzKKqRdnxna@cluster0.sabdy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log(" plans database connected")
})
.catch(function(err){
    console.log(err);
});


const planSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        maxLength:[20, 'Length must be less than 20']
    },
    duration:{
        type:Number,
        required:[true, 'please enter duration']
    },
    price:{
        type:Number,
        required:[true, 'please enter price']
    },
    ratings:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount <100;
        }, 'Please enter discount value less than 100']
    }
});

const planModel = mongoose.model('planModel', planSchema);

// (async function createPlan(){
//     let plan = {
//         name: "Plan 1",
//         duration:2,
//         price:100,
//         ratings:5,
//         discount:20
//     }
//     const data = await planModel.create(plan)
//     console.log(data);
// })();

module.exports = planModel;