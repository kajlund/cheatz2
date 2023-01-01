const express = require('express')

const mncpHandlers = require('./municipality.handlers')
const { auth, adminOnly } = require('../../middleware/auth')

const router = express.Router()

router.get('/', auth, mncpHandlers.getAll)
router.get('/byname/:name', auth, mncpHandlers.getByNamePart)
router.get('/:id', auth, mncpHandlers.getById)
router.post('/', auth, adminOnly, mncpHandlers.addMunicipality)
router.put('/:id', auth, adminOnly, mncpHandlers.updateMunicipality)
router.delete('/:id', auth, adminOnly, mncpHandlers.deleteById)

module.exports = router
