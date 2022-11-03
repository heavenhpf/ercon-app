const { Router } = require('express')
const modules = require('../modules/item.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/item/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getItem(req.user.id, req.user.level, Number(req.params.id_item)))
})

app.put('/item/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editBufferQuantity(req.user.id, Number(req.params.id_item), req.body))
})

app.get('/item/detail/:id_item_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getItemDetail(Number(req.params.id_item_detail)))
})

app.put('/item/detail/:id_item_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editItemQuantity(req.user.id, Number(req.params.id_item_detail), req.body))
})

app.get('/my/:category?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listMyItem(req.user.id, Number(req.params.category)))
})

app.get('/:tier/:category?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listItem(req.user.level, Number(req.params.tier), Number(req.params.category)))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addItem(req.user.id, req.body))
})

app.delete('/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteItem(req.user.id, Number(req.params.id_item)))
})

app.put('/:id_item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editItem(req.user.id, Number(req.params.id_item), req.body))
})

module.exports = app