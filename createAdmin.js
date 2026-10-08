const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")

dotenv.config()

async function createAdmin(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
        const existingAdmin = await User.findOne({
            username: "dipankar"
        })
        if(existingAdmin){
            console.log("Admin Allready Exist")
            return;
        }
        const admin = new User({
            username: "dipankar",
            email: "dipankar@gmail.com",
            role: "ADMIN"
        })
        await User.register(admin,"dipankar9002155618")
        console.log('Admin created Successfully')
    } catch(error){
        console.log(error)
    } finally{
        await mongoose.connection.close()
    }
}

createAdmin()