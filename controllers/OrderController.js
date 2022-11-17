const { Router } = require('express')
const modules = require('../modules/order.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/:order_to', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listOrder(req.user.id, Number(req.params.order_to)))
})

app.post('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addOrder(req.user.id, req.user.level, Number(req.params.id), req.body))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editOrder(req.user.id, Number(req.params.id), req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteOrder(req.user.id, Number(req.params.id)))
})

module.exports = app