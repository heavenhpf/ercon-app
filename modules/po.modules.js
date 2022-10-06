const prisma = require('../helpers/database')
const document = require('../helpers/document')
const Joi = require('joi')

class _po {
    addPo = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                order_to: Joi.number().required(),
                doc_name: Joi.string().required(),
                doc_data: Joi.any().required(),
                po_number: Joi.string().required(),
                note: Joi.string(),
                deadline: Joi.date().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const checkCompanyFrom = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id_user,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            }).finally(prisma.$disconnect())

            const checkCompanyTo = await prisma.s_company.findFirst({
                where: {
                    id_company: body.order_to,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            if (!(checkCompanyFrom && checkCompanyTo)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const doc = await document.addDoc(doc_name, doc_data)

            if (!doc) {
                return {
                    status: false,
                    code: 409,
                    error: "File not uploaded"
                }
            }

            const add = await prisma.d_po.create({
                data: {
                    id_doc: doc.id_doc,
                    order_from: checkCompanyFrom.id_company,
                    order_to: body.order_to,
                    po_number: body.po_number,
                    status: 0,
                    note: body.note,
                    deadline: body.deadline
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addPo module error ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _po()