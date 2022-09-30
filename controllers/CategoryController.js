const { Router } = require('express')
const modules = require('../modules/category.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const app = Router()

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addCategory(req.body))
})

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listCategory())
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteCategory(req.params.id))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editCategory(req.params.id, req.body))
})

module.exports = app