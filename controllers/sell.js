const Sell = require('../model/sell')
const Product = require('../model/product')

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
                                res.json(data)
                            }
                        })

                })
                
            })
        
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
    const { _id, productId } = req.sell
    const errors=[]
    Expense.findByIdAndUpdate(_id, req.body, { new: true }, (updatingError, data) => {
        if (updatingError) {
            errors.push({
                error: "cette vente ne peut etre modifier"
            })
        }

                const quantity =req.body.quantity - req.sell.quantity
                const sold = req.sell.quantity-req.body.sold
                Product.findById(productId)
                .exec((findingError,product)=>{
                    if (findingError) {
                        errors.push({
                            error: "le produit ne peut etre trouver"
                        })
                    }
                    product.quantity=product.quantity+quantity
                    product.sold=product.sold-sold
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
                        }
                        res.json([data,updatedProduct])
                    })

            })
        res.json(data)
    })
}

exports.list = (req, res) => {
    let sortBy =req.query.sortBy ?req.query.sortBy:'createdAt'
    let fromDate= req.query.fromDate ? new Date(req.query.fromDate) : new Date().setHours(0,0,0)
    let toDAte= req.query.toDate ?new Date(req.query.toDate):new Date()
    if(toDAte>Date.now() || toDAte<fromDate){
        toDAte=new Date()
    }

    Sell.find({createdAt:{$gte:fromDate,$lte:toDAte}})
        .populate("shop")
        .populate("product")
        .sort(sortBy)
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