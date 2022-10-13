const { Router } = require('express')
const modules = require('../modules/dn.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addDn(req.user.id, req.body))
})

module.exports = app