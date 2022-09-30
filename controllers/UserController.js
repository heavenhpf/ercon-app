const { Router } = require('express')
const modules = require('../modules/user.modules')
const response = require('../helpers/response')

const app = Router()

app.get('/', async (req, res, next) => {
    response.sendResponse(res, await modules.listUser())
})

app.post('/', async (req, res, next) => {
    response.sendResponse(res, await modules.addUser(req.body))
})

app.delete('/:id', async (req, res, next) => {
    response.sendResponse(res, await modules.deleteUser(req.params.id))
})

module.exports = app