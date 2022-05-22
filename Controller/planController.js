const planModel = require("../models/planModel");

module.exports.getAllPlan = async function getAllPlan(req, res){
    try{
        const data = await planModel.find();

        if(data){
            res.json({
                data:data
            })
        }else{
            res.json({
                message: "Data is not available"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }

}

module.exports.getPlan = async function getPlan(req, res){
    let id  = req.params.id;
    try{
        if(id){
        const data = await planModel.findById(id);
            if(data){
                res.json({
                    data: data
                })
            }else{
                res.json({
                    message: "Plan not found"
                })
            }
        }else{
            res.json({
                message: "Please enter id"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
   

}

module.exports.createPlan = async function  createPlan(req, res){
    let data = req.body;
    try{
        if(data){
            let user  = await planModel.create(data);
            if(user){
                res.json({
                    data: user
                })
            }else{
                res.json({
                    message: "user not created"
                })
            }
        }else{
            res.json({
                message: "Please enter valid user details"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
    
}

module.exports.updatePlan = async function updatePlan(req, res){

    let id = req.params.id;
    let data = req.body;
    try{
        if(id){
            let user  = await planModel.findByIdAndUpdate(id,data);
            if(user){
                res.json({
                    message:"plan updated",
                    data :user
                })
            }else{
                res.json({
                    message: "plan not updated"
                })
            }
        }else{
            res.json({
                message: "Please enter valid id"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res){
    let id = req.params.id;
    try{
        if(id){
            let user  = await planModel.findByIdAndDelete(id);
            if(user){
                res.json({
                    message:"Plan deleted",
                    data: user
                })
            }else{
                res.json({
                    message: "plan not deleted"
                })
            }
        }else{
            res.json({
                message: "Please enter valid id"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.top3plans = async function top3plans(req, res){
    try{
        let plans = await planModel.find().sort({
            ratings:-1
        }).limit(3);
        if(plans){
            res.json({
                data:plans
            })
        }else{
            res.json({
                message:"Plans not found"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
  
}