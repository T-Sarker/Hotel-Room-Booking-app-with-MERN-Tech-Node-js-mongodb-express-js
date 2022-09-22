const express = require('express')
const router = express.Router();
const RoomController = require('../controllers/RoomController');
const { verifyAdmin } = require('../utils/verifications');

// create
router.post('/create',verifyAdmin,RoomController.create)
// get data
router.get('/show/:id',RoomController.single)
//all-data
router.get('/all',RoomController.allData)
// edit-data
router.put('/update',verifyAdmin,RoomController.update)
// delete-data
router.delete('/delete/:id',verifyAdmin,RoomController.delete)

module.exports = router