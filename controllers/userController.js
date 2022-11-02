const Joi = require('@hapi/joi');
const User = require('../models/User');

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


module.exports.viewRecord = (req,res) => {
    try{
        return res.status(200).json({
            'status' : "All Record fetch"
        })
    }catch(e){
        return res.status(400).json({
            'status': e
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
        "status" : "Invalid Username/Password"
    })
}

