const Sell = require('../model/sell')
const Product = require('../model/product')
const {genMatricule} = require('./matricule')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    const sells = req.body
Sell.insertMany(sells,(error, data) => {
    const errors=[]
        if (error || !data) {
            errors.push({
                error: "impossible de d'ajouter la vente"
            })
        }
        data.map((sell)=>{
            Product.findById(sell.product)
            .exec((error,product)=>{
                if (error || !product) {
                    errors.push({
                        error: "impossible de retrouver les produits"
                    })
                }
                product.quantity=product.quantity-sell.quantity
                product.sold=product.sold+sell.quantity
                console.log(product)
                    product.save((error,selledProduct)=>{
                        if (error || !selledProduct) {
                            errors.push({
                                error: error
                            })
                        }

                        if(errors.length != 0){
                            console.log(errors)
                            res.status(400).json(errors)
                        }else{
                            console.log('ok')
                        }
                    })

            })
            
        })
        res.json(sells)
    })
}
exports.sellById = (req, res, next, id) => {
    Sell.findById(id)
        .populate("shop")
        .populate("product")
        .exec((error, data) => {
            if (error || !data) {
                return res.status(400).json({
                    error: "cette vente est introuvable"
                })
            }
            req.sell = data
            next()
        })
}
exports.read = (req, res) => {
    return res.json(req.sell)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id, product } = req.sell
    console.log(req.sell)
    const errors=[]
    Sell.findByIdAndUpdate(_id, req.body, { new: true }, (updatingError, data) => {
        if (updatingError) {
            errors.push({
                error: "cette vente ne peut etre modifier"
            })
        }
                Product.findById(product)
                .exec((findingError,product)=>{
                    if (findingError) {
                        errors.push({
                            error: "le produit ne peut etre trouver"
                        })
                    }
                    product.quantity=product.quantity+ req.body.quantity - req.sell.quantity
                    product.sold=product.sold-req.sell.quantity+req.body.quantity
                    product.save((updatingProductError,updatedProduct)=>{
                        if (updatingProductError) {
                            errors.push({
                                error: "l'ancien produit ne peut etre modifier"
                            })
                        }
                        if(errors.length!==0){
                            res.status(400).json(errors)
                        }
                        res.json([data,updatedProduct])
                    })

                })
                
    })
}

exports.remove = (req, res) => {
    const errors=[]
    const sell = req.sell
    sell.remove((error, data) => {
        if (error) {
            errors.push({
                error: 'cette vente ne peut etre supprimee'
            })
        }
            Product.findById(sell.product)
            .exec((findingproductError,product)=>{
                if (findingproductError) {
                    errors.push({
                        error: 'le produit concerne ne peut etre modifier'
                    })
                }
                    product.quantity=product.quantity+sell.quantity
                    product.sold=product.sold-sell.quantity
                    product.save((updatingProductError,updatedProduct)=>{
                        if (updatingProductError) {
                            errors.push({
                                error: "l'ancien produit ne peut etre modifier"
                            })
                        }
                        if(errors.length!==0){
                            res.status(400).json(errors)
                        }                    })

            })
        res.json(data)
    })
}

exports.list = (req, res) => {
    
    let shop =req.query.shop ?req.query.shop:''
    let fromDate= Date.parse(req.query.fromDate) ? Date.parse(req.query.fromDate) : new Date().setHours(0,0,0)
    let toDate= Date.parse(req.query.toDate) ? Date.parse(req.query.toDate):new Date()
    if(toDate>Date.now() || toDate<fromDate){
        toDate=new Date()
    }
    console.log(shop,fromDate,toDate)
    var query
    if(shop.length>0){
        query = {createdAt:{$gte:fromDate,$lte:toDate},shop:shop}
    }else{
        query = {createdAt:{$gte:fromDate,$lte:toDate}}
    }
     
    Sell.find(query)
        .populate("shop")
        .populate("product")
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les ventes'
                })
            }
            res.json(data)
        })
}
exports.todayListByShop = (req, res) => {
    const a = new Date()
    a.setHours(0, 0, 0, 0)
    Sell.find({ createdAt: { $gte: a.toISOString(), $lte: new Date().toISOString() }, shop: req.shop._id })
        .populate('product')
        .populate('shop')
        .exec((error, data) => {
            if (error) {
                return res.json({
                    error: 'impossible de charger les ventes d\'aujourd\'hui'
                })
            }
            let sum = 0
            data.map((d, i) => {
                sum = sum + (d.price * d.quantity)
            })
            const datas = [...data, { total: sum }]
            res.json(datas)
        })

}

exports.sellMatricule=(req,res)=>{
    Sell.find()
    .limit(1)
    .sort({$natural:-1})
    .select('mat')
    .exec((error,data)=>{
        if (error) {
            return res.json({
                error: 'impossible de charger la dernirer matricule'
            })
        }
        if(data.length>0 && data[0].mat != undefined){
            const matricule = genMatricule("VEB-",data[0].mat+1)
            res.json({mat:data[0].mat+1,matricule:matricule})
        }else{
            const matricule = genMatricule("VEB-",1)
            res.json({mat:1,matricule:matricule})        }
        
    })
}

exports.sellsByMatricule=(req,res)=>{
    Sell.find({matricule:req.param.matricule})
    .exec((error,data)=>{
        if (error) {
            return res.json({
                error: 'impossible de charger les ventes par ce matricule'
            })
        }
        res.json(data)        
    })
}