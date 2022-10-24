const { Router } = require('express')
const modules = require('../modules/unit.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listUnit())
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addUnit(req.user.id, req.body))
})

app.put('/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editUnit(req.user.id, Number(req.params.id_item), req.body))
})

app.delete('/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteUnit(req.user.id, Number(req.params.id_item)))
})

module.exports = app