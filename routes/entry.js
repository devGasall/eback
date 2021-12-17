const express = require('express')
const router = express.Router()
const {entryMatricule,create,read,update,entryById,remove,list,entryByShop} = require('../controllers/entry')
const {shopById}=require('../controllers/shop')

router.post('/entry',create)
router.put('/entry/:entryId',update)
router.get('/entry/:entryId',read)
router.delete('/entry/:entryId',remove)
router.get('/entries/shop/:shopId',entryByShop)
router.get('/entries',list)
router.get('/matricule/entry',entryMatricule)

router.param('entryId',entryById)
router.param('shopId',shopById)

module.exports = router