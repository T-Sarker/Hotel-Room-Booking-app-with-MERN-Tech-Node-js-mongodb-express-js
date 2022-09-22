
//defining the methods

const HotelModel = require("../models/hotel")
const RoomModel = require('../models/Room')
const { HandelError } = require("../utils/errorHandel")

//create data
/** 
    *route: localhost:4000/api/room/create
    method: post
    test result: OK
 */
exports.create = async (req,res,next)=>{
    
    const {title,price,maxPeople,details,roomNumbers,hotelId} = req.body

    try {
        const room = await RoomModel.create({
            title,
            price,
            maxPeople,
            details,
            roomNumbers,
            hotelId
        })

        try {
            const HotelUdate = await HotelModel.findByIdAndUpdate(hotelId,{$push:{
                rooms:room._id
            }})
        } catch (error) {
            await RoomModel.findByIdAndDelete(room._id)
            console.log(error);
            return next(HandelError(500,'SOmething Went wrong'))
        }

        return res.status(200).json(room)
    } catch (error) {
        console.log(error);
        return next(HandelError(500,'SOmething Went wrong'))
    }
}

/** 
    *route: localhost:4000/api/room/show/id 
    method: get
    test result: OK
 */
exports.single = async (req,res,next)=>{
    try {
        const room = await RoomModel.findOne({_id:req.params.id})
        return res.status(200).json(room)
    } catch (error) {
        return next(HandelError(404,'No data Found'))
        
    }
}

/** 
    *route: localhost:4000/api/room/all 
    method: get
    test result: OK
 */
//all data list 
exports.allData = async (req,res,next)=>{
    try {
        const rooms = await RoomModel.find()
        return res.status(200).json(rooms)
    } catch (error) {
        return next(HandelError(404,'No data Found'))
    }
}

/** 
    *route: localhost:4000/api/room/update 
    method: put
    test result: OK
 */
exports.update = async (req,res)=>{
    try {
        const room = await RoomModel.findOne({_id:req.body.id})
        if (room) {
            const UpdateRoom = await RoomModel.findByIdAndUpdate(req.body.id,{$set:{
                
                title : req.body.title,
                price : req.body.price,
                maxPeople : req.body.maxPeople,
                details : req.body.details,
                roomNumbers : req.body.roomNumbers,
                hotelId: req.body.hotelId
            }},{new:true})
            return res.status(200).json(UpdateRoom)

        } else {
            return next(HandelError(404,'No data Found'))
        }
    } catch (error) {
        return next(HandelError(404,'No data Found'))
    }
}


/** 
    *route: localhost:4000/api/room/delete/id 
    method: delete
    test result: OK
 */
exports.delete = async (req,res,next)=>{
   try {
    const room = await RoomModel.findByIdAndDelete({_id:req.params.id})
    console.log(room);
    const HotelUdate = await HotelModel.findByIdAndUpdate(room.hotelId,{$pull:{
        rooms:room._id
    }})
    return res.status(200).json('Successfully Deleted')
   } catch (error) {
    console.log(error);
        return next(HandelError(404,'No data Found'))
   }
}
