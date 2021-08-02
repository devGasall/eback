const Commanded = require('../model/commanded')
const mongoose = require('mongoose')

exports.create = (req,res) => {

    const commandeds = req.body
    Commanded.insertMany(commandeds,(err,data)=>{
        if(err){
            return res.status(400).json({
                err:"impossible d'ajouter ce produit a la commande"
                })
            }
        res.json(data)
    })
}
exports.commandedById=(req,res,next,id)=>{
    Commanded.findById(id)
    .populate('product')
    .populate('command')
    .exec((error,data)=>{
        if(error || !data){
            return res.status(400).json({
                error:"cette commande n'existe pas"
            })
        }
        req.commanded=data
        next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.commanded)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.commanded
    Commanded.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cette commande ne peut etre modifier"
            })
        }
        res.json(data)
    })

}

exports.remove=(req,res)=>{
    const commanded = req.commanded
    commanded.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'cette commande ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) => {
Commanded.find()
.populate('product')
.populate('command')
.exec((error,data)=>{
    if(error){
        return res.status(400).json({
            error:'impossible de charger les commandes'
        })
    }
    res.json(data)
})
}

exports.commandedByCommand = (req,res)=>{
    Commanded.find({command:req.command._id})
    .populate('command')
    .populate('product')
    .exec((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'impossible de lister les detail de ce commande '
            })
        }
        res.json(data)
    })
}