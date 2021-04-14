const Expense = require('../model/expense')


exports.create = (req, res) => {
    const expenses = req.body
Sell.insertMany(expenses,(error, data) => {
        if (req.error || !data) {
            return res.status(400).json({
                error: "impossible de d'ajouter la vente"
            })
        }
        res.json(data)
    })
}
exports.expenseById = (req, res, next, id) => {
    Expense.findById(id)
        .populate("shop")
        .populate("user")
        .exec((error, data) => {
            if (error || !data) {
                return res.status(400).json({
                    error: "cette vente est introuvable"
                })
            }
            req.expense = data
            next()
        })
}
exports.read = (req, res) => {
    return res.json(req.expense)
}

exports.update = (req, res) => {
    const expense = req.expense
    expense.save((error, data) => {
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
    console.log(req.expense)
    const expense = req.expense
    expense.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cette vente ne peut etre supprimee'
            })
        }
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

    Expense.find({createdAt:{$gte:fromDate,$lte:toDAte}})
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
