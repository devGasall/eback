const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema
const photoSchema = new mongoose.Schema({
    photo:{
        data:Buffer,
        contentType:String,
    },
    quantity:{
        type:Number,
        required:false
    },
    product:{
        type:ObjectId,
        ref:'product',
        required:true,
    }
},{timestamps:true})

module.exports= mongoose.model("Photo",photoSchema)