const mongoose = require("mongoose")
const connectDatabase = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/search");
        console.log("database is connected")
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    connectDatabase
}