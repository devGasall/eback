const express =require('express')
const router =express.Router()
const {create,categoryById,read,update,remove,list} = require('../controllers/category')
const {isAuth,isAdmin,requireSignin}=require('../controllers/auth') 

router.get('/category/:categoryId',requireSignin,isAuth,read)
router.post('/category/create',requireSignin,isAuth,isAdmin,create)
router.put('/category/:categoryId',requireSignin,isAuth,isAdmin,update)
router.delete('/category/:categoryId',requireSignin,isAuth,isAdmin,remove)
router.get('/categories',requireSignin,isAuth,list)

router.param('categoryId',categoryById)

module.exports = router