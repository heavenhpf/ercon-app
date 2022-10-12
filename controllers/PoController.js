const { Router } = require('express')
const modules = require('../modules/po.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/detail/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listPoDetail(req.params.id))
})

app.get('/detail/:id_po/:id_po_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getPoDetail(req.params.id_po, req.params.id_po_detail))
})

app.get('/my/:status?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listMyPo(req.user.id, req.params.status))
})

app.get('/:id/:status?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listAllPo(req.params.id, req.params.status))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addPo(req.user.id, req.body))
})

module.exports = app