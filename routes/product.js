const express = require('express')
const router = express.Router()
const {create,read,update,productById,remove,list,stock} = require('../controllers/product')

router.post('/product',create)
router.put('/product/:productId',update)
router.get('/product/:productId',read)
router.delete('/product/:productId',remove)
router.get('/products',list)
router.get('/products/stock',stock)

router.param('productId',productById)

module.exports = router