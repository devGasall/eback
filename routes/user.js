const express= require('express')
const router = express.Router()

const {signup,signin,signout,usersList}=require('../controllers/auth')
const {userSignupValidator} = require('../validator')

router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)
router.get("/userslist",usersList)

module.exports = router 