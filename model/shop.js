const mongoose = require('mongoose')
const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    addresse: String,
    tel: {
        type: String,
        required: false
    }
}, { timestamps: true })
module.exports = mongoose.model('Shop', ShopSchema)

