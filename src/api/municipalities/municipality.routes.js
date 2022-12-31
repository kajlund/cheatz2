const express = require('express')

const mncpHandlers = require('./municipality.handlers')

const router = express.Router()

router.get('/', mncpHandlers.getAll)
router.get('/byname/:name', mncpHandlers.getByNamePart)
router.get('/:id', mncpHandlers.getById)
router.post('/', mncpHandlers.addMunicipality)
router.put('/:id', mncpHandlers.updateMunicipality)
router.delete('/:id', mncpHandlers.deleteById)

module.exports = router
