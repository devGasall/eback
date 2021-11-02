const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema
const commandedSchema = new mongoose.Schema({
    command:{
        type:ObjectId,
        ref:'Command',
        required:true,
    },
    product:{
        type:ObjectId,
        ref:'Product',
        required:true,
    },
    commandPrice:{
        type:Number,
        required:true
    },
    shopPrice:{
        type:Number,
        default:0,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports= mongoose.model("Commanded",commandedSchema)