const express = require('express')
const router = express.Router()
const {create,read,update,versementById,remove,list,versementListByShop} = require('../controllers/versement')
const {shopById}=require('../controllers/shop')

router.post('/versement',create)
router.put('/versement/:versementId',update)
router.get('/versement/:versementId',read)
router.delete('/versement/:versementId',remove)
router.get('/versements',list)
router.get("/versements/:shopId",versementListByShop)

router.param('versementId',versementById)
router.param('shopId',shopById)

module.exports = router