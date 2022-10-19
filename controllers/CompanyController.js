const { Router } = require('express')
const modules = require('../modules/company.modules')
const response = require('../helpers/response')
const { userSession, verifyAdmin } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, verifyAdmin, async (req, res, next) => {
    response.sendResponse(res, await modules.listCompany())
})

app.get('/name', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getName(req.user.id))
})

app.get('/my', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getMyCompany(req.user.id))
})

app.post('/', userSession, verifyAdmin, async (req, res, next) => {
    response.sendResponse(res, await modules.addCompany(req.body))
})

app.put('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editMyCompany(req.user.id, req.body))
})

app.delete('/:id', userSession, verifyAdmin, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteCompany(req.params.id))
})

module.exports = app