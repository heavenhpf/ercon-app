const prisma = require('../helpers/database')
const Joi = require('joi')

class _document {
    getDoc = async (id_doc) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_doc)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const get = await prisma.d_doc.findUnique({
                where: {
                    id_doc
                }
            })

            if (!get) {
                return {
                    status: false,
                    code: 404,
                    error: "Document not found"
                }
            }

            return {
                status: true,
                data: get
            }
        } catch (error) {
            console.error('getDoc module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addDoc = async (file) => {
        try {
            const add = await prisma.d_doc.create({
                data: {
                    name: file.filename,
                    path: file.path,
                    original_name: file.originalname,
                    mime: file.mimetype
                },
                select: {
                    id_doc: true
                }
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addDoc module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _document()