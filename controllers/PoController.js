const { Router } = require('express')
const modules = require('../modules/po.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const app = Router()

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addPo(req.user.id, req.body))
})

module.exports = app