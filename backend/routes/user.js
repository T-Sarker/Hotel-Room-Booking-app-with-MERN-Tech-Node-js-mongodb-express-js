const express = require('express')
const UserController = require('../controllers/UserController'); 
const { verifyAdmin,verifyUser } = require('../utils/verifications');


const router = express.Router();


// get data
router.get('/show/:id',verifyUser,UserController.single)
//all-data
router.get('/all',verifyAdmin,UserController.all)
// edit-data
router.put('/update',verifyUser,UserController.update)
// delete-data
router.delete('/delete/:id',verifyUser,UserController.delete)


module.exports = router