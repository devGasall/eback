const Product = require('../model/product')
const mongoose = require('mongoose')

exports.create=(req,res)=>{
    const product = new Product(req.body)
    product.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error :"ce produit ne peut etre creer"
            })
        }
        res.json(data)
    })
}

exports.productById =(req,res,next,id)=>{
    Product.findById(id)
    .populate('category')
    .exec((error,data)=>{
        if(error || !data){
            return res.status(400).json({
                error :"ce produit n'existe pas"
            })
        }
        req.product = data
        next()
    })
}
  
exports.update = (req,res) =>{
    mongoose.set('useFindAndModify', false);
    const {_id} =req.product
    Product.findByIdAndUpdate(_id,req.body,{new:true},(error,data)=>{
        if(error){
            return res.status(400).json({
                error :"ce produit ne peut etre modifier"
            })
        }
        res.json(data)
    })

}
exports.read =(req,res)=>{
    res.json(req.product)
}
exports.remove = (req,res)=>{
    const product = req.product
    product.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error :"ce produit ne peut etre supprime"
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) =>{
    Product.findAll().exec((error,data)=>{
        if(error){
            return res.status(400).json({
                error :"les produits ne sont pas recupperable pour l'instant"
            })
        }
        res.json(data)
    })
}