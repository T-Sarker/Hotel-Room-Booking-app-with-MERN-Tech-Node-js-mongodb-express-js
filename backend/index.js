const express = require('express')
var cors = require('cors')
var morgan = require('morgan')
require('dotenv').config()
var cookieParser = require('cookie-parser')
const db = require('./DB/connect')
const authRoute = require('./routes/auth')
const hotelRoute = require('./routes/hotel')
const roomRoute = require('./routes/room')
const userRoute = require('./routes/user')

//creating react app
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(morgan('tiny'))
//middleware
app.use(express.json())

Running_Port = process.env.PORT || 5000

db() //calling the DB connection method

//running app on port
app.listen(Running_Port, () => {
    console.log(`Example app listening on port ${Running_Port}`)
})

// declaring the routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/room', roomRoute);
app.use('/api/hotel', hotelRoute);

//handeling errors with middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || 'Something went wrong'

    return res.status(errorStatus).json({
        success: false,
        msg: errorMsg,
        status: errorStatus,
        stack: err.stack

    })
})
