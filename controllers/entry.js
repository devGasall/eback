const Entry = require('../model/entry')
const mongoose = require('mongoose')
const {genMatricule} =require('./matricule')

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
    console.log(req)
    Entry.find({shop:req.shop._id})
        .populate({
            path:'product',
            populate:{
                path:''
            }
        })
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

exports.entryMatricule=(req,res)=>{
    Entry.find()
    .limit(1)
    .sort({$natural:-1})
    .select('mat')
    .exec((error,data)=>{
        if (error) {
            return res.json({
                error: 'impossible de charger le dernier matricule'
            })
        }
        if(data.length>0 && data[0].mat != undefined){
            const matricule = genMatricule("EEB-",data[0].mat+1)
            res.json({mat:data[0].mat+1,matricule:matricule})
        }else{
            const matricule = genMatricule("EEB-",1)
            res.json({mat:1,matricule:matricule})        }
        
    })
}