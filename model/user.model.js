
const mongoose = require("mongoose")

 const UserSchema  =  new mongoose.Schema({
    name : {
        type:String,
        unique:true,
        require:true

    },
    email: { 
        type:String,
        unique:true,
        require:true
    },
    password : {
        type:String,
        require:true
    }

 },
 { timestamps: true }
 )


 

  module.exports = mongoose.model("user",UserSchema)


 