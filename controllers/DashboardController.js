const { Router } = require('express')
const modules = require('../modules/dashboard.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/count/po', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countPo(req.user.id))
})

app.get('/count/po/status', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countPoStatus(req.user.id))
})

app.get('/count/incoming_po', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countIncomingPo(req.user.id))
})

app.get('/count/incoming_po/status', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countIncomingPoStatus(req.user.id))
})

app.get('/count/dn', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countDn(req.user.id))
})

app.get('/count/supplier', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countSupplier(req.user.id, req.user.level))
})

app.get('/count/item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countItem(req.user.id))
})

module.exports = app