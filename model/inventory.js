const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const InventorySchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    mesuredQuantity: {
        type: Number,
        required: true,
        default:0
    }
}, { timestamps: true })
module.exports = mongoose.model('Inventory', InventorySchema)