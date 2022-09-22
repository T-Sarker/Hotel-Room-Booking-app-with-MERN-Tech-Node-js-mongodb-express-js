//import mongoose 
const mongoose = require('mongoose')
//connect with the url 

const connectDB =  async ()=>{
    await mongoose.connect(process.env.mongoose_url,{ 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    },(err)=>{
    
        if (err) {
            console.log("Database is not connected");
        } else {
            console.log("Database connected");
            
        }
    });
}

module.exports = connectDB
