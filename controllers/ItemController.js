const { Router } = require('express')
const modules = require('../modules/item.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/item/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getItem(req.params.id))
})

app.get('/:tier/:category?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listItem(req.params.tier, req.params.category))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addItem(req.user.id, req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteItem(req.user.id, req.params.id))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editItem(req.user.id, req.params.id, req.body))
})

module.exports = app