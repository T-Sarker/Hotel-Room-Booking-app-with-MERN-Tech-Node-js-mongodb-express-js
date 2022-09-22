
//defining the methods

const UserModel = require("../models/User")
const { HandelError } = require("../utils/errorHandel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//create data
//register data
/** 
    *route: localhost:4000/api/auth/register
    method: post
    test result: OK
 */
exports.register = async (req, res, next) => {
    const salt = parseInt(process.env.saltRounds)

    req.body.password = await bcrypt.hash(req.body.password, salt) //hashing the password

    const { username, email, password, city, address, phone } = req.body //destructuring the data from req.body

    try {
        const user = await UserModel.create({
            username,
            email,
            password,
            city,
            address,
            phone
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return next(HandelError(400, 'User can not be created'))
    }
}

//single data find
/** 
    *route: localhost:4000/api/auth/login
    method: post
    test result: OK
 */
exports.login = async (req, res, next) => {
    try {
        const userCheck = await UserModel.findOne({ email: req.body.email })


        const match = await bcrypt.compare(req.body.password, userCheck.password);
        if (!match) {
            return next(HandelError(400, 'Wrong Credentials'))
        } else {
            const { password, isAdmin, ...otherData } = userCheck._doc
            const payLoad = {
                id: userCheck._id, is_admin: userCheck.isAdmin
            }
            const jwtToken = jwt.sign(payLoad, process.env.JWT_SECRET)
            return res.cookie("access_token", jwtToken, { httpOnly: true }).status(200).json({ ...otherData })
        }
    } catch (error) {
        console.log(error);
        return next(HandelError(401, 'Login Failed! Use Correct Info'))
    }
}


exports.logout = (req, res, next) => {
    try {
        res.clearCookie('access_token')
        return res.status(200).json('logout Success')
    } catch (error) {
        console.log(error);
        return next(HandelError(401, 'Logout Failed!'))
    }
}
