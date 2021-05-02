const Photo = require('../model/photo')
const Product = require('../model/product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const errorHandler = require('../helpers/dbErrorHandler')
const photo = require('../model/photo')
exports.create = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const { quantity, product } = fields
        if (!quantity || !product) {
            return res.status(400).json({
                error: 'all fields are required'
            })
        }
        let phto = new Photo(fields)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less 1MB in size"
                })
            }
            phto.photo.data = fs.readFileSync(files.photo.path)
            phto.photo.contentType = files.photo.type
        }
        phto.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })

    })
}
exports.read = (req, res) => {
    req.photo.photo = undefined
    res.json(req.photo)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const { quantity, product } = fields
        if (!quantity || !product) {
            return res.status(400).json({
                error: 'all fields are required'
            })
        }

        let phto = req.photo
        phto = _.extend(phto, fields)
        console.log(phto)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less 1MB in size"
                })
            }
            phto.photo.data = fs.readFileSync(files.photo.path)
            phto.photo.contentType = files.photo.type
        }
        phto.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
    })

}
exports.photoById = (req, res, next, id) => {
    Photo.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "impossible de trouver cette photo"
            })
        }
        req.photo = data
        next()
    })

}
exports.photoByProduct = (req, res) => {
    const id = req.product._id
    Photo.find({ product: id })
        .select('-photo')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Pas de photo trouver pour ce produit"
                })
            }
            res.json(data)
        })

}
exports.remove = (req, res) => {
    let photo = req.photo
    photo.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "cette photo ne peut etre supprimer"
            })
        }
        res.json({
            data,
            "message": "la photo a ete supprimer avec succes"
        })
    })
}

exports.showPhoto = (req, res) => {
    if (req.photo.photo.data) {
        res.set('contentType', req.photo.photo.contentType)
        return res.send(req.photo.photo.data)
    }

    next()
}