const { Router } = require('express')
const modules = require('../modules/company.modules')
const response = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

const app = Router()

app.get('/', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.listCompany())
})

app.get('/name', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.getCompany(req.user.id))
})

app.post('/', async (req, res, next) => {
    response.sendResponse(res, await modules.addCompany(req.body))
})

app.put('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.editCompany(req.user.id, req.params.id, req.body))
})

app.delete('/:id', userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.deleteCompany(req.params.id))
})

module.exports = app