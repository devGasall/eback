const Shop = require('../model/shop')


exports.create=(req,res)=>{
    const shop =new Shop(req.body)
    shop.save((error,data)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                error:error.errmsg
                })
            }
        res.json(data)
    })
}
exports.shopById=(req,res,next,id)=>{
     Shop.findById(id).exec((error,data)=>{
         if(error || !data){
             return res.status(400).json({
                 error:"ce boutique n'existe pas"
             })
         }
         req.shop=data
         next()
     })
}
exports.read = (req,res)=>{
    return res.json(req.shop)
}

exports.update=(req,res)=>{
    const shop = req.shop
    shop.tel= req.body.tel
    shop.save((error,data)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                error:'ce entree ne peut etre modifiee'
            })
        }
        res.json(data)
    })
}

exports.remove=(req,res)=>{
    console.log(req.shop)
    const shop = req.shop
    shop.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:'cette entree ne peut etre supprimee'
            })
        }
        res.json(data)
    })
}

exports.list = (req,res) =>{
Shop.find().exec((error,data)=>{
    if(error){
        return res.status(400).json({
            error:'impossible de charger les entrees'
        })
    }
    res.json(data)
})
}