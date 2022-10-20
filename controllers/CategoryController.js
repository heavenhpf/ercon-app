const { Router } = require('express')
const modules = require('../modules/category.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listCategory())
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addCategory(req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteCategory(Number(req.params.id)))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editCategory(Number(req.params.id), req.body))
})

module.exports = app