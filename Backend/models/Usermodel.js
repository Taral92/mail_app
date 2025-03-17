const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ProfilePhoto:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)
const userModel= mongoose.model('User',UserSchema)
module.exports= {userModel}