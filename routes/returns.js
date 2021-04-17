const express = require('express')
const router = express.Router()
const {create,read,update,returnsById,remove,list,returnsByShop} = require('../controllers/returns')
const {shopById}=require('../controllers/shop')

router.post('/returns',create)
router.put('/returns/:returnsId',update)
router.get('/returns/:returnsId',read)
router.delete('/returns/:returnsId',remove)
router.get('/returns/shop/:shopId',returnsByShop)
router.get('/returns',list)

router.param('returnsId',returnsById)

module.exports = router