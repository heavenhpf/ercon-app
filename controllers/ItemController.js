const { Router } = require('express')
const modules = require('../modules/item.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const app = Router()

app.get('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listItem(req.params.id))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addItem(req.user.id, req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteItem(req.params.id))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editItem(req.params.id, req.body))
})

module.exports = app