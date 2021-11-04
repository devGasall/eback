const Commanded = require('../model/commanded')
const mongoose = require('mongoose')
const Product = require('../model/product')

exports.create = (req,res) => {
    const errors=[]
    const commandeds = req.body
    Commanded.insertMany(commandeds,(error,datas)=>{
        if(error || !datas){
            errors.push({
                err:"impossible d'ajouter ce produit a la commande"
                })
            }
        datas.map((data)=>{
            Product.findById(data.product)
            .exec((error,product)=>{
                if(error || !product){
                    errors.push({
                        error:"impossible de trouver le produit correspondant"
                        })
                    }
                else{
                    product.quantity=product.quantity+data.quantity
                    product.save((error,modifiedproduct)=>{
                        if(error || !modifiedproduct){
                            errors.push({
                                error:"impossible d'ajouter la quantite commandee au produit correspondant"
                                })
                        }
                    })
                }
            })
        })
        if(errors.length != 0){
            res.status(400).json(errors)
        }
        res.json(datas)
    })
}
exports.commandedById=(req,res,next,id)=>{
    Commanded.findById(id)
    .populate('product')
    .populate('command')
    .exec((error,data)=>{
        if(error || !data){
            return res.status(400).json({
                error:"cette commande n'existe pas"
            })
        }
        req.commanded=data
        next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.commanded)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.commanded
    const errors=[]
    Commanded.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            errors.push({
                error: "cette commande ne peut etre modifier"
            })
        }else{
            Product.findById(data.prodcut)
            .exec((errorFindingProduct,product)=>{
                if (errorFindingProduct) {
                    errors.push({
                        errorFindingProduct: "le produit correspondant ne peut etre trouver"
                    })
                }else{
                    product.quantity = product.quantity -req.commanded.quantity+req.body.quantity
                    product.save((errorModifyingProduct,modifiedProduct)=>{
                        if (errorModifyingProduct) {
                            errors.push({
                                errorModifyingProduct: "le produit correspondant ne peut etre trouver"
                            })
                        }
                    })
                }
            })
        }

        if(errors.length>0){
            res.status(400).json(errors)
            errors=[]
        }else{
            res.json(data)
        }
        
    })

}

exports.remove=(req,res)=>{
    const commanded = req.commanded
    commanded.remove((error,data)=>{
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