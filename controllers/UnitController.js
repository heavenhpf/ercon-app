const { Router } = require('express')
const modules = require('../modules/unit.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listUnit())
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addUnit(req.body))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editUnit(Number(req.params.id), req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteUnit(Number(req.params.id)))
})

module.exports = app