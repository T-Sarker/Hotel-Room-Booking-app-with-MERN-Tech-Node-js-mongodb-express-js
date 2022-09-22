const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    hotelId:{
        type:String,
    },
    roomNumbers:[{number:Number, bookedDates:{type:[Date]}}]
},{timeStamp:true})

const RoomModel = mongoose.model('Room',RoomSchema)

module.exports = RoomModel