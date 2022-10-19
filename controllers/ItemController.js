const { Router } = require('express')
const modules = require('../modules/item.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/item/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getItem(req.user.id, req.user.level, req.params.id_item))
})

app.put('/item/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editBufferQuantity(req.user.id, req.params.id_item, req.body))
})

app.get('/item/:id_item/:id_item_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getItemDetail(req.params.id_item, req.params.id_item_detail))
})

app.put('/item/:id_item/:id_item_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editItemQuantity(req.user.id, req.params.id_item, req.params.id_item_detail, req.body))
})

app.get('/my/:category?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listMyItem(req.user.id, req.params.category))
})

app.get('/:tier/:category?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listItem(req.user.level, req.params.tier, req.params.category))
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