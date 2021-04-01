const Entry = require('../model/entry')


exports.create = (req, res) => {
    const entry = new Entry(req.body)
    entry.save((error, data) => {
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
    const entry = req.entry
    entry.quantity = req.body.quantity

    entry.save((error, data) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                error: 'cette entree ne peut etre modifiee'
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
                error: 'cette entrre ne peut etre supprimee'
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
    const entry = await Entry.aggregate([
        {$match: { shop: req.shop._id } },
        {$lookup:{
            from:"shops",
            localField:"shop",
            foreignField:"_id",
            as:"lshop"
        }},
        {$lookup:{
            from:"products",
            localField:"product",
            foreignField:"_id",
            as:"lproduct"
        }},
    ])

    console.log(entry)
    res.send(entry)
}