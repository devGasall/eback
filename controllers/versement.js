const Versement = require('../model/versement')


exports.create = (req, res) => {
    const versement = new Versement(req.body)
    versement.save((error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "impossible de d'ajouter la vente"
            })
        }
        res.json(data)
    })
}
exports.versementById = (req, res, next, id) => {
    Versement.findById(id).exec((error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error: "cette vente est introuvable"
            })
        }
        req.versement = data
        next()
    })
}
exports.read = (req, res) => {
    return res.json(req.versement)
}

exports.update = (req, res) => {
    const versement = req.versement
    versement.somme = req.body.somme

    versement.save((error, data) => {
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
    console.log(req.versement)
    const versement = req.versement
    versement.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cette vente ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {
    Versement.find()
        .populate("shop")
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les ventes'
                })
            }
            res.json(data)
        })
}
exports.versementListByShop = (req, res) => {
    const a = new Date()
    a.setHours(0, 0, 0, 0)
    Versement.find({ shop: req.shop._id })
        .populate('shop')
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les ventes de cette boutique'
                })
            }
            res.json(data)
        })

}