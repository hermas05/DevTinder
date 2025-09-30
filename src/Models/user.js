const {mongoose} = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        validator : (value)=>{
            return value.length <= 30;
        }
    },
     lastName : {
        type : String,
         validator : (value)=>{
            return value.length <= 30;
        }
    },
     gender : {
        type : String,
        enum : ["male" , "female" , "other"]
    },
     age : {
        type : Number,
        min : 18,
        max : 65
    },
     mail : {
        type : String,
        required : true,
        unique : true
    },
     password : {
        type : String,
        required : true,
         validator : (value)=>{
            return value.length < 8;
        }
    },
     about : {
        type : String,
        default : "This is about me section"
    }
})

const User = mongoose.model("user" , userSchema)

module.exports=User;