const { Router } = require('express')
const modules = require('../modules/order.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const app = Router()

app.get('/all', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listAllOrder())
})

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listMyOrder(req.user.id))
})

app.post('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addOrder(req.user.id, req.params.id, req.body))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editOrder(req.user.id, req.params.id, req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteOrder(req.user.id, req.params.id))
})

module.exports = app