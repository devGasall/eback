const express = require('express')
const router = express.Router()
const {create,read,update,commandedById,remove,list,commandedByCommand} = require('../controllers/commanded')
const {commandById} =require('../controllers/command')
router.post('/commanded',create)
router.put('/commanded/:commandedId',update)
router.get('/commanded/:commandedId',read)
router.delete('/commanded/:commandedId',remove)
router.get('/commandeds',list)
router.get('/commandeds/:commandId',commandedByCommand)

router.param('commandedId',commandedById)
router.param('commandId',commandById)

module.exports = router