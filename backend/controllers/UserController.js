const UserModel = require("../models/User")
const bcrypt = require('bcrypt')
const { HandelError } = require("../utils/errorHandel")
//defining the methods




//single data find
exports.single = async (req,res,next)=>{
    try {
        const user = await UserModel.findOne({_id:req.params.id})
        return res.status(200).json(user)
    } catch (error) {
        return next(HandelError(404,'No user found'))
    }
}

//all data list 
exports.all = async (req,res,next)=>{
    try {
        const users = await UserModel.find()
        return res.status(200).json(users)
    } catch (error) {
        return next(HandelError(404,'No user found'))
    }
}

exports.update = async (req,res,next)=>{
    try {
       
        const user = await UserModel.findOne({_id:req.body.id})
        const salt = parseInt(process.env.saltRounds);
        if (user) {
            if (req.body.password!='') {
                req.body.password = await bcrypt.hash(req.body.password,salt)
            } else {
                req.body.password=user.password
            }
            console.log(req.body.password);
            user.username = req.body.username
            user.email = req.body.email
            user.password = req.body.password
            user.city = req.body.city
            user.address = req.body.address
            user.phone = req.body.phone

            const updatedUser = await user.save();
            return res.status(200).json(updatedUser)
        } else {
            console.log(user);
            return next(HandelError(404,'No user found'))
        }
        
    } catch (error) { 
        console.log(error);
        return next(HandelError(404,'No user found'))
    }
}

exports.delete = async (req,res,next)=>{
    try {
        await UserModel.findByIdAndDelete({_id:req.params.id})
        return res.status(200).json('Successfully Deleted')
    } catch (error) {
        return next(HandelError(404,'No user found'))
    }
}