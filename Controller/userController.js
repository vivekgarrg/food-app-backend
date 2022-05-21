module.exports.getUser = async function getUser(req,res){
    let data  = await userModel.find();
    // let data = await userModel.findOne({name:"Vivek"}) 
    res.json({
        data:data
    })
}
module.exports.postUser =async function postUser(req, res) {
    let obj = req.body;
    let user = await userModel.create(obj);

    res.json({
        message: "Post successfully",
        data:user
    })
}
module.exports.updateUser =async function updateUser(req, res) {
    let data = req.body
    let user  = await userModel.findOneAndUpdate({email:req.body.email}, data)
    res.json({
        message:"Data updated successfully",
        data : user
    })
}
module.exports.deleteUser =async function deleteUser(req, res) {
    // let user = await userModel.findOneAndDelete({email:"vkg1617@gmail.com"});
    await userModel.deleteMany();
    res.json({
        message: "data deleted"
    })
}

module.exports.getUserById =function getUserById(req, res){
    console.log(req.params)
    res.json({
       message:"params ",
        params:req.params.id
    })
}

module.exports.getCookies =function getCookies(req, res){
    console.log(req.cookies.isLoggedIn);
    res.send("cookie done")
}

module.exports.setCookies =function setCookies(req,res){
    res.cookie("isLogged", false, {maxAge:1000*60*60*24, httpOnly:true, secure:true})
    res.send("Cookie has been set")
}

