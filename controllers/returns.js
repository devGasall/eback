const Returns = require('../model/returns')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    const returns = req.body
    Returns.insertMany(returns, (error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "impossible de d'ajouter le retour"
            })
        }
        res.json(data)
    })
}
exports.returnsById = (req, res, next, id) => {
    Returns.findById(id)
        .populate("shop")
        .populate("product")
        .populate('user')
        .exec((error, data) => {
            if (error || !data) {
                return res.status(400).json({
                    error: "cet retour est introuvable"
                })
            }
            req.returns = data
            next()
        })
}
exports.read = (req, res) => {
    return res.json(req.returns)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.returns
    Returns.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cet retour ne peut etre modifier"
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    const returns = req.returns
    returns.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cet retour ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {
    Returns.find()
        .populate("shop")
        .populate("user")
        .populate('product')
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les retours'
                })
            }
            res.json(data)
        })
}


exports.returnsByShop = (req, res) => {
    Returns.find({ shop: req.shop._id })
        .populate('shop')
        .populate('product')
        .populate('user')
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les retours'
                })
            }
            res.json(data)
        })
}