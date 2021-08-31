const express = require('express')
const router = express.Router()
const {create,read,update,inventoryById,remove,list} = require('../controllers/inventory')
const {shopById}=require('../controllers/shop')

router.post('/inventory',create)
router.put('/inventory/:inventoryId',update)
router.get('/inventory/:inventoryId',read)
router.delete('/inventory/:inventoryId',remove)
router.get('/inventories',list)

router.param('inventoryId',inventoryById)
router.param('shopId',shopById)

module.exports = router