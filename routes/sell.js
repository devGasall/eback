const express = require('express')
const router = express.Router()
const {create,read,update,sellById,remove,list,todayListByShop} = require('../controllers/sell')
const {shopById}=require('../controllers/shop')

router.post('/sell',create)
router.put('/sell/:sellId',update)
router.get('/sell/:sellId',read)
router.delete('/sell/:sellId',remove)
router.get('/sells',list)
router.get("/sells/today/:shopId",todayListByShop)

router.param('sellId',sellById)

module.exports = router