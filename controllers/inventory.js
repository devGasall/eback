const Inventory = require('../model/inventory')
const Product = require('../model/product')
const mongoose = require('mongoose')

exports.create = (req,res) => {
   
    Product.find()
    .select("quantity")
    .exec((error,data)=>{
        if(error || !data){
            return res.status(400).json({
                error:"l'inventaire de ce produit n'existe pas"
            })
        }
       data.map((product)=>{
           console.log(product)
           const inventory = new Inventory({product:product._id,quantity:product.quantity})
        inventory.save((err,data)=>{
            if(err || !data){
                console.log(err)
                return res.status(400).json({
                    err:"il est impossible de faire l'inventaire"
                })
            }
            console.log("2",data)
        })
       })
    })
    res.send('ok')
}
exports.inventoryById=(req,res,next,id)=>{
    Inventory.findById(id)
    .populate('product')
    .exec((error,data)=>{
        if(error || !data){
            return res.status(400).json({
                error:"l'inventaire de ce produit n'existe pas"
            })
        }
        req.inventory=data
        next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.inventory)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.inventory
    Commanded.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cette commande ne peut etre modifier"
            })
        }
        res.json(data)
    })

}

exports.remove=(req,res)=>{
    const inventory = req.inventory
    inventory.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'cette commande ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) => {
Commanded.find()
.populate('product')
.populate('command')
.exec((error,data)=>{
    if(error){
        return res.status(400).json({
            error:'impossible de charger les commandes'
        })
    }
    res.json(data)
})
}

exports.commandedByCommand = (req,res)=>{
    Commanded.find({command:req.command._id})
    .populate('command')
    .populate('product')
    .exec((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'impossible de lister les detail de ce commande '
            })
        }
        res.json(data)
    })
}