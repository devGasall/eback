const mongoose = require('mongoose')
const ShopSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    addresse:{
        type:String,
        require:true,
        unique:true
    },
    tel:{
        type:String,
        require:false
    }
},{timestamps:true})
module.exports =mongoose.model('Shop',ShopSchema)

