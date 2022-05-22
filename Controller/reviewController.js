const planModel = require('../models/planModel');
let reviewModel = require('../models/reviewModel')

module.exports.getAllReviews = async function getAllReviews(req, res){
    try{
        const data = await reviewModel.find();
        if(data){
            res.json({
                data:data
            })
        }else{
            res.json({
                message: "Reviews not found"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.top3reviews = async function top3reviews(req, res){
    try{
        const data = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if(data){
            res.json({
                data:data
            })
        }else{
            res.json({
                message: "Reviews not found"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.getReview = async function getReview(req, res){
    try{
        const id = req.params.id;
        if(id){
           let data =  await reviewModel.findById(id);
           if(data){
               res.json({
                   data:data
               })
           }else{
               res.json({
                   message:"Id not found"
               })
           }
        }else{
            res.json({
                message:"Please enter id"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
    
}

module.exports.createReview = async function createReview(req, res){
    try{
        const plan = req.params.plan;
        if(plan){
            let planData = await planModel.findById(plan);
            if(planData){
                planData.rating += 2;
                let review = await reviewModel.create(req.body);
                await planModel.findByIdAndUpdate(plan, {rating:planData.rating})
                res.json({
                    message:"review created",
                    data : review
                });
            }else{
                res.json({
                    message:"Plan not found",
                    data : review
                });
            }
            
        }else{
            res.json({
                message:"plan id is not present"
            });
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.updateReview =  async function updateReview(req, res){
    try{
        const id = req.params.id;
        const data  = req.body;
        if(id){
           let user =  await reviewModel.findByIdAndUpdate(id, data);
           if(user){
               res.json({
                   data:user
               })
           }else{
               res.json({
                   message:"User not found"
               })
           }
        }else{
            res.json({
                message:"Please enter id"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteReview =  async function deleteReview(req, res){
    try{
        const id = req.params.id;
        if(id){
           let user =  await reviewModel.findByIdAndDelete(id);
           if(user){
               res.json({
                   data:user
               })
           }else{
               res.json({
                   message:"User not found"
               })
           }
        }else{
            res.json({
                message:"Please enter id"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}