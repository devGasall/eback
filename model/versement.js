const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema
const VersementSchema = new mongoose.Schema({
    shop:{
        type:ObjectId,
        ref:'Shop',
        required:true,
    },
    somme:{
        type:Number,
        required:true
    },
},{timestamps:true})
module.exports=mongoose.model('Versement',VersementSchema)