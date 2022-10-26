const { Router } = require('express')
const modules = require('../modules/dashboard.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/count/po', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countPo(req.user.id))
})

app.get('/count/po/:status', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countPoStatus(req.user.id, Number(req.params.status)))
})

app.get('/count/dn', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countDn(req.user.id))
})

app.get('/count/supplier', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countSupplier(req.user.id))
})

app.get('/count/item', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.countItem(req.user.id))
})

module.exports = app