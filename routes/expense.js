const express = require('express')
const router = express.Router()
const {create,read,update,expenseById,remove,list,expensesByShop} = require('../controllers/expense')
const {shopById}=require('../controllers/shop')

router.post('/expense',create)
router.put('/expense/:expenseId',update)
router.get('/expense/:expenseId',read)
router.delete('/expense/:expenseId',remove)
router.get('/expense/shop/:shopId',expensesByShop)
router.get('/expenses',list)

router.param('expenseId',expenseById)
router.param('shopId',shopById)

module.exports = router