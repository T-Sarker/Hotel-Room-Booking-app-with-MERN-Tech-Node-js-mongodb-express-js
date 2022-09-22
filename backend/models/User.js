const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    photos:{
        type:String,
        default:'asfsdfasdfadsf'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timeStamp:true
})

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel