const Sell = require('../model/sell')


exports.create = (req, res) => {
    const sell = new Sell(req.body)
    sell.save((error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "impossible de d'ajouter la vente"
            })
        }
        res.json(data)
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
    const sell = req.sell
    sell.quantity = req.body.quantity

    sell.save((error, data) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                error: 'cette vente ne peut etre modifiee'
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    console.log(req.sell)
    const sell = req.sell
    sell.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cette vente ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {
    Sell.find()
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
                return res.status(400).json({
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