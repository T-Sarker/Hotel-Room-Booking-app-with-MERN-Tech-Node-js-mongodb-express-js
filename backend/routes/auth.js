const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register) //handeled by auth controller
router.post('/login', AuthController.login) //handeled by auth controller
router.get('/logout', AuthController.logout) //handeled by auth controller


module.exports = router