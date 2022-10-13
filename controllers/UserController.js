const { Router } = require('express')
const modules = require('../modules/user.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listUser())
})

app.get('/username', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getUsername(req.user.username))
})

module.exports = app