const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema
const commandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    deptFees:{
        type:Number,
        required:true,
        default:0
    },
    arrFees:{
        type:Number,
        reqyuired:true,
        default:0
    }
},{timestamps:true})

module.exports= mongoose.model("Command",commandSchema)