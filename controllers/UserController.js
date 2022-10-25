const { Router } = require('express')
const modules = require('../modules/user.modules')
const response = require('../helpers/response')
const { userSession, verifyAdmin } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, verifyAdmin, async (req, res, next) => {
    response.sendResponse(res, await modules.listUser())
})

app.get('/username', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getUsername(req.user.username))
})

app.put('/password', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editPassword(req.user.id, req.body))
})

module.exports = app