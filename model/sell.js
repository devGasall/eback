const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema
const SellSchema = new mongoose.Schema({
    shop:{
        type:ObjectId,
        ref:'Shop',
        required:true,
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
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('Sell',SellSchema)