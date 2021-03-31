const express =require('express')
const router =express.Router()
const {create,categoryById,read,update,remove,list} = require('../controllers/category')
const {isAuth,isAdmin,requireSignin}=require('../controllers/auth') 

router.get('/category/:categoryId',read)
router.post('/category',create)
router.put('/category/:categoryId',update)
router.delete('/category/:categoryId',remove)
router.get('/categories',list)

router.param('categoryId',categoryById)

module.exports = router