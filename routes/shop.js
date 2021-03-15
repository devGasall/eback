const express = require('express')
const router = express.Router()
const {create,read,update,shopById,remove,list} = require('../controllers/shop')

router.post('/shop',create)
router.put('/shop/:shopId',update)
router.get('/shop/:shopId',read)
router.delete('/shop/:shopId',remove)
router.get('/shops',list)

router.param('shopId',shopById)

module.exports = router