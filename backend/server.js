const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors");
const {connectDatabase} = require("./utils/database")

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())

const userSchema = new mongoose.Schema({
    name:String,
    email:String
})

const User = mongoose.model("User", userSchema)



app.get("/user", async(req, res) =>{
   try{
    const allUsers = await User.find();
    if(allUsers){
        res.json(allUsers)
    }
   }catch(err){
    res.json(err)
   }
})

app.post('/user', async(req, res) =>{
    try{
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        if(savedUser){
            res.json(savedUser)
        }
    }catch(err){
        res.json(err)
    }
})

app.listen(port, ()=>{
    console.log("server is running");
    connectDatabase()
});
