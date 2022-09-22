const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    type:{
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
    distance:{
        type:Number,
        required:true,
    },
    photos:{
        type:[String],
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room'
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }
},{
    timeStamp:true
})

const HotelModel = mongoose.model('Hotel',HotelSchema);

module.exports = HotelModel