const Joi = require('@hapi/joi');
const User = require('../models/User');

module.exports.userRegister = (req,res) => {
    // console.log("User Controller register");
    // console.log(req.body);
    const Schema = Joi.object().keys({
        username : Joi.string().min(3).required(),
        email : Joi.string().min(3).email().required(),
        password : Joi.string().min(5).max(20).required(),
        cpassword : Joi.string().min(3).max(20).required()
    }).unknown(false);

    const {error} = Schema.validate(req.body, { abortEarly: false});

    if(error){
        return res.json(403,{
            'msg' : error['details'][0]['message']
        })
    }
    else{
        if(req.body.password == req.body.cpassword){
            User.find({email : req.body.email}, function(err,alredyExit){
                if(err){
                    return res.json(500,{
                        "msg" : "Something wrong"
                    })
                }
                if(!alredyExit){
                    User.create(req.body, function(err,userData){
                        if(err){
                            return res.json(500,{
                                'msg' : "Request not sent proper"
                            })
                        }
                        return res.json(200,{
                            'msg' : "Register Successfully"
                        })
                    })
                }else{
                    return res.json(200,{
                        'msg' : "Your are already registered with this email"
                    })
                }

            })
        }
        else{
            return res.json(203,{
                'msg' : "Password and confirm password not match"
            })
        }
    }
}