const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema
const ExpenseSchema = new mongoose.Schema({
    shop:{
        type:ObjectId,
        ref:'Shop',
        required:true,
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    somme:{
        type:Number,
        required:true
    },
},{timestamps:true})
module.exports=mongoose.model('Expense',ExpenseSchema)