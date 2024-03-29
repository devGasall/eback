const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        require:false
    },
    quantity:{
        type:Number,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
        default:0
    },
    sold:{
        type:Number,
        required:true,
        default:0
    }, 
    price:{
        type:Number,
        required:true,
    }, 
    shopPrice:{
        type:Number,
        required:true,
        default:0
    } ,
    category:{
        type:ObjectId,
        ref:'Category',
        required:true,
    },
},{timestamps:true})

module.exports= mongoose.model("Product",productSchema)