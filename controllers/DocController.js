const { Router } = require('express')
const multer = require('multer')
const uploads = require('../helpers/upload')
const response = require('../helpers/response')
const modules = require('../modules/doc.modules')
const storagePO = uploads('PO', 'PO')
const storageDN = uploads('DN', 'DN')
const uploadPO = multer({ storage: storagePO })
const uploadDN = multer({ storage: storageDN })
const { userSession } = require('../helpers/middleware')

const app = Router()

app.post('/po', uploadPO.single('file'), userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addDoc(req.file))
})

app.post('/dn', uploadDN.single('file'), userSession, async (req, res, next) => {
    response.sendResponse(res, await modules.addDoc(req.file))
})

app.get('/:id_doc', userSession, async (req, res, next) => {
    const doc = await modules.getDoc(Number(req.params.id_doc))
    if (doc.status) {
        res.setHeader('Content-Disposition', `attachment; filename=${doc.data.name}`)
        res.setHeader('Content-Type', doc.data.mime)
        res.status(200)
        res.sendFile(doc.data.path)
    } else {
        response.sendResponse(res, doc)
    }
})

module.exports = app