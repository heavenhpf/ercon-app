const { Router } = require('express')
const modules = require('../modules/user.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listUser())
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addUser(req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteUser(req.params.id))
})

module.exports = app