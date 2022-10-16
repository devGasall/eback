const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema
const ReturnsSchema = new mongoose.Schema({
    shop:{
        type:ObjectId,
        ref:'Shop',
        required:true,
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:false,
    },
    product:{
        type:ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    

},{timestamps:true})
module.exports=mongoose.model('Returns',ReturnsSchema)