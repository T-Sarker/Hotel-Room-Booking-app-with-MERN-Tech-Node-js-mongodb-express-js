const jwt = require('jsonwebtoken')
const { HandelError } = require('./errorHandel')


//verify token
const verifyToken =(req,res,next)=>{
    const token = req.cookies.access_token

    // checking the cookies
    if (!token) {
        return next(HandelError(403,'Unauthorized! Login First'))
    } 

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if (err) 
        {
            return next(HandelError(401,'Invalid Login!'))
        }
        
        req.userData = decoded
        
         next();
    })
}


//verify user

 exports.verifyUser = (req,res)=>{
     verifyToken(req,res,()=>{
         if (req.userData.id===req.params.id || req.userData.is_admin) {
             return next()
         }else{
             return next(HandelError(403,'Unauthorized! Login First'))
         }
     })
 }
// verify admin
exports.verifyAdmin = (req,res,next)=>{

     verifyToken(req,res,()=>{
      
        //  console.log(req.userData.is_admin+" is the admin");
         if (req.userData.is_admin) {
             return next()
         }else{
             return next(HandelError(403,'Unauthorized! Login First'))
         }
     })
 }

