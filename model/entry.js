const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema
const EntrySchema = new mongoose.Schema({
    mat:{
        type:Number,
        required:true
    },
    matricule:{
        type:String,
        required:true
    },
    shop:{
        type:ObjectId,
        ref:'Shop',
        required:true,
    },
    user:{
        type:ObjectId,
        ref:'Product',
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
module.exports=mongoose.model('Entry',EntrySchema)