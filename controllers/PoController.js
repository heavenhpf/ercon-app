const { Router } = require('express')
const modules = require('../modules/po.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/detail/:id_po', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listPoDetail(Number(req.params.id_po)))
})

app.get('/detail/:id_po/:id_po_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getPoDetail(Number(req.params.id_po), Number(req.params.id_po_detail)))
})

app.put('/detail/:id_po/:id_po_detail', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editPoDetail(req.user.id, Number(req.params.id_po), Number(req.params.id_po_detail), req.body))
})

app.get('/incoming/:status?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listIncomingPo(req.user.id, Number(req.params.status)))
})

app.get('/my/:status?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listMyPo(req.user.id, Number(req.params.status)))
})

app.get('/:tier/:status?', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listAllPo(Number(req.params.tier), Number(req.params.status)))
})

app.post('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addPo(req.user.id, req.body))
})

module.exports = app