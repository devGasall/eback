const Command = require('../model/command')
const mongoose = require('mongoose')

exports.create=(req,res)=>{
    console.log(req.body)
    const command =new Command(req.body)
    command.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err:"impossible de creer la commande"
                })
            }
        res.json(data)
    })
}
exports.commandById=(req,res,next,id)=>{
     Command.findById(id).exec((error,data)=>{
         if(error || !data){
             return res.status(400).json({
                 error:"cette commande n'existe pas"
             })
         }
         req.command=data
         next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.command)
}

exports.update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    const { _id } = req.command
    Command.findByIdAndUpdate(_id, req.body, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: "cette commande ne peut etre modifier"
            })
        }
        res.json(data)
    })

}

exports.remove=(req,res)=>{
    const command = req.command
    command.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'cette commande ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) =>{
Category.find().exec((error,data)=>{
    if(error){
        return res.status(400).json({
            error:'impossible de charger les commandes'
        })
    }
    res.json(data)
})
}