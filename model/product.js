const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:false
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },   
    category:{
        type:ObjectId,
        ref:'Category',
        required:true,
    }
},{timestamps:true})

module.exports= mongoose.model("Product",productSchema)