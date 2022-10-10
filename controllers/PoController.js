const { Router } = require('express')
const modules = require('../modules/po.modules')
const response = require('../helpers/response')
const { userSession, userSessionSU } = require('../helpers/middleware')

const app = Router()

app.get('/:id/:status?', userSessionSU, async (req, res, next) => {
    response.sendResponse(res, await modules.listAllPo(req.params.id, req.params.status))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addPo(req.user.id, req.body))
})

module.exports = app