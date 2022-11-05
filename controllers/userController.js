const Joi = require('@hapi/joi');
const User = require('../models/User');
const jwtSession = require('jsonwebtoken');

module.exports.userRegister = (req,res) => {
    // console.log("User Controller register");
    // console.log(req.body);
   try{
    const Schema = Joi.object().keys({
        username : Joi.string().min(3).required(),
        email : Joi.string().min(3).email().required(),
        password : Joi.string().min(5).max(20).required(),
        cpassword : Joi.string().min(3).max(20).required()
    }).unknown(false);

    const {error} = Schema.validate(req.body, { abortEarly: false});

    if(error){
        return res.status(403).json({
            'msg' : error['details'][0]['message']
        })
    }
    else{
        if(req.body.password == req.body.cpassword){
            
            User.findOne({email : req.body.email}, function(err,alredyExit){
                if(err){
                    return res.status(500).json({
                        "msg" : "Something wrong"
                    })
                }
                console.log(alredyExit);
                if(!alredyExit){
                    User.create(req.body, function(err,userData){
                        if(err){
                            return res.status(500).json({
                                'msg' : "Request not sent proper"
                            })
                        }
                        return res.status(200).json({
                            'msg' : "Register Successfully"
                        })
                    })
                }else{
                    return res.status(200).json({
                        'msg' : "Your are already registered with this email"
                    })
                }

            })
        }
        else{
            return res.status(403).json({
                'msg' : "Password and confirm password not match"
            })
        }
    }
   }catch(e){
       return res.status(400).json({
        'status' : e
       })
   } 
    
}


module.exports.viewRecord = async (req,res) => {
    try{
        // console.log(req.user.username);
        let userData = await User.find({});
        return res.status(200).json({
            'status' : "All Record fetch",
            'record' : userData
        })
    }catch(e){
        return res.status(400).json({
            'status': e
        })
    }
}
module.exports.createSession = async (req,res) => {
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
             return res.status(422).json({
                'message' : "Invalid username & password"
             });
        }
        // console.log(user.isLogin);
        if(user.isLogin){
            return res.status(200).json({
                message : "Your are already Login! Please logout",
                data : {
                    token : user.isLogintoken
                }
            })
        }
        else{
            var tokenGenerate = await jwtSession.sign(user.toJSON(),'SudokuG',{ expiresIn: '100000'});
            //console.log(tokenGenerate);
            let updateUser = await User.findByIdAndUpdate(user.id,{
                "isLogin" : "1",
                "isLogintoken" : tokenGenerate
            });
            if(updateUser){
                return res.status(200).json({
                    message: "Sign in Successfully, here is your token, keep it safe",
                    data : {
                        token : tokenGenerate
                    }   
                })
            }
            else{
                return res.status(422).json({
                    message: "Record not updated"
                })
            }
        }
        
    }catch(err){
        console.log("********", err);
        return res.status(500).json({
            'message' : "Internal Server Error"
        })
    }
    

}


module.exports.userLogin = (req,res) => {
    try{
        return res.status(200).json({
            'status' : "Login successfully"
        })
    }
    catch(e){
        return res.status(500).json({
            "status" : "Something wrong"
        })
    }
}

module.exports.failureJson = (req,res) => {
    return res.status(400).json({
        "status" : "you have to first login !"
    })
}

module.exports.logoutUser = async (req,res) => {
    try{
        // console.log(req.user);
        // let user = await User.findById(req.params.id);
        if(req.user){
            let userUpdate =await User.findByIdAndUpdate(req.user.id,{
                isLogin : "false",
                isLogintoken : ""
            });
            if(userUpdate){
                return res.status(200).json({
                    'message':"Logout Successfully"
                })
            }
            else{
                return res.status(500).json({
                    'message' : "Some internal error"
                })
            }
        }else{
            return res.status(500).json({
                'message' : "User not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            'message' : err
        })
    }
   
}

module.exports.logoutSuccess = async (req,res) => {
    
    if(req.session){
        console.log(req.user);
    }
}