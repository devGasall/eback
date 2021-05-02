const express = require('express')
const router = express.Router()
const {create,read,update,photoById,remove,photoByProduct,showPhoto} = require('../controllers/photo')
const {productById} = require('../controllers/product')

router.post('/photo',create)
router.put('/photo/:photoId',update)
router.get('/photo/:photoId',read)
router.delete('/photo/:photoId',remove)
router.get('/photo/product/:productId',photoByProduct)
router.get('/photo/show/:photoId',showPhoto)
router.param('photoId',photoById)
router.param('productId',productById)

module.exports = router