const mongoose = require('mongoose')

const emailschema= new  mongoose.Schema({
     
    to:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }

},{
    timestamps:true
})
const emailx =mongoose.model('emails',emailschema) 
module.exports={emailx}