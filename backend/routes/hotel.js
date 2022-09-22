const express = require('express')
const router = express.Router();
const HotelController = require('../controllers/HotelController');
const { verifyAdmin } = require('../utils/verifications');

// create
router.post('/create', verifyAdmin, HotelController.create)
// get data
router.get('/show/:id', HotelController.single)
//all-data
router.get('/all', HotelController.allData)

//getting the counts data for the front page
router.get('/countbycity', HotelController.hotelsByCity)
router.get('/countbytype', HotelController.hotelsByType)

// edit-data
router.put('/update', verifyAdmin, HotelController.update)
// delete-data
router.delete('/delete/:id', verifyAdmin, HotelController.delete)

module.exports = router