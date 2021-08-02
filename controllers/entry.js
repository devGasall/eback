const Entry = require('../model/entry')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    const entries = req.body
    Entry.insertMany(entries,(error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "impossible de d'ajouter la quantite prise"
            })
        }
        res.json(data)
    })
}
exports.entryById = (req, res, next, id) => {
    Entry.findById(id)
        .populate("shop")
        .populate("product")
        .exec((error, data) => {
            if (error || !data) {
                return res.status(400).json({
                    error: "cette entree est introuvable"
                })
            }
            req.entry = data
            next()
        })
}
exports.read = (req, res) => {
    return res.json(req.entry)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.entry
    Product.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cet entree ne peut etre modifier"
            })
        }
        res.json(data)
    })

}

exports.remove = (req, res) => {
    console.log(req.entry)
    const entry = req.entry
    entry.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cette entree ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {
    Entry.find()
        .populate("shop")
        .populate("product")
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les entrees'
                })
            }
            res.json(data)
        })
}


exports.entryByShop = async (req, res) => {
    Entry.find({shop:req.shop._id})
        .populate('product')
        .populate('shop')
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les entrees pour cette boutique. '
                })
            }
            res.json(data)
    })
}