const express = require('express')
const router = express.Router()

const {create,read,update,commandById,remove,list} = require('../controllers/command')

router.get('/command/:commandId', read)
router.post('/command', create)
router.put('/command/:commandId', update)
router.delete('/command/:commandId', remove)
router.get('/commandes', list)

router.param('commandId', commandById)

module.exports = router