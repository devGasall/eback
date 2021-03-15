const Category = require('../model/category')


exports.create=(req,res)=>{
    console.log(req.body)
    const category =new Category(req.body)
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err:"impossible de creer ce categorie"
                })
            }
        res.json(data)
    })
}
exports.categoryById=(req,res,next,id)=>{
     Category.findById(id).exec((error,data)=>{
         if(error || !data){
             return res.status(400).json({
                 error:"ce categorie n'existe pas"
             })
         }
         req.category=data
         next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.category)
}

exports.update=(req,res)=>{
    const category = req.category
    category.name=req.body.name
    category.save((error,data)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                error:'ce categorie ne peut etre modifiee'
            })
        }
        res.json(data)
    })
}

exports.remove=(req,res)=>{
    const category = req.category
    category.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'ce categorie ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) =>{
Category.find().exec((error,data)=>{
    if(error){
        return res.status(400).json({
            error:'impossible de charger les categories'
        })
    }
    res.json(data)
})
}