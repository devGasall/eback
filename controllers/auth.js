const User = require('../model/user')
const jwt= require('jsonwebtoken') // is used to generate signed token
const expressJwt= require('express-jwt') // for authorization check

const {errorHandler} =require('../helpers/dbErrorHandler')
const { reset } = require('nodemon')

exports.signup=(req,res)=>{
console.log("req.body", req.body )
const user= new User(req.body)
user.save((err,user)=>{
    if(err){
        return res.status(400).json({
            err:errorHandler(err)
        })
    }
    user.salt=undefined
    user.hashed_password = undefined
    res.json({
        user
    })
})
} 
exports.signin=(req,res)=>{
    //find the user based email
    const {email,password}= req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"Cet email n'existe pas, SVP inscrivez-vous"
            })
        }
        // if user is found make sure the email and password match
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(400).json({ err:"L'email et le mot de passe ne correspondent pas"})
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({_id:user.id},process.env.JWT_SECRET)
        //parsist token as 't' in ookie with expiry date
        res.cookie('t',token,{expire:new Date()+9999})
        //return response with user and token to frotend client
        const {_id,name ,email,role } = user
        return res.json({token,user:{_id,email,name,role}})
    })
}
exports.signout=(req,res)=>{
    res.clearCookie('t')
    res.json({message:"Deconnexion reussi"})
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:"auth"

})
exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error : 'Acces refuse'
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:'resource Admin ! Acces refuse '
            })
        }
        next()
}
exports.usersList=(req,res)=>{
    return User.find((err,data)=>{
        if(err){
            return res.status(403).json({error:"Il y a pas d'utilisateur pour votre application"})
        }
        res.json(data)
    })
}
