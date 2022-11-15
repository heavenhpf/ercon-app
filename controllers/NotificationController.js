const { Router } = require('express')
const modules = require('../modules/notification.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listNotification(req.user.id))
})

module.exports = app