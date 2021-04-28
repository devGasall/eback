const Expense = require('../model/expense')
const mongoose = require('mongoose')

exports.create = (req, res) => {
const expenses = new Expense(req.body)
Expense.insertMany(expenses,(error, data) => {
        if (error || !data) {
            return res.status(400).json({
                error:"les depenses non pas pu etre enregistre"
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
                    error: "cette depense est introuvable"
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
    mongoose.set('useFindAndModify', false);
    const { _id } = req.expense
    Expense.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cette depense ne peut etre modifier"
            })
        }
        res.json(data)
    })

}

exports.remove = (req, res) => {
    const expense = req.expense
    expense.remove((error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'cette depense ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {
   
    Expense.find()
        .populate("shop")
        .populate("users")
        .sort(sortBy)
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les depenses'
                })
            }
            res.json(data)
        })
}

exports.expensesByShop = async (req, res) => {
    console.log(req.shop)
    const expenses = await Expense.find({shop:req.shop._id})
        .exec((error,data)=>{
            if (error) {
                return res.status(400).json({
                    error: 'impossible de charger les depenses de cette boutuque'
                })
            }
            res.json(data)
        })
}