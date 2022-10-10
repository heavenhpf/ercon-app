const prisma = require('../helpers/database')
const document = require('../helpers/document')
const Joi = require('joi')

class _po {
    listAllPo = async (tier, status) => {
        try {
            const body = {
                tier: parseInt(tier),
                status: (status) ? parseInt(status) : null
            }

            const schema = Joi.object({
                tier: Joi.number().required(),
                status: Joi.any()
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

            let list = await prisma.d_po.findMany({
                orderBy: {
                    id_po: 'desc'
                },
                where: {
                    s_company_d_po_order_toTos_company: {
                        auth_user: {
                            level: body.tier
                        }
                    },
                    deleted_at: null
                },
                include: {
                    s_company_d_po_order_toTos_company: {
                        select: {
                            name: true
                        }
                    },
                    d_po_detail: {
                        select: {
                            quantity: true,
                            d_order: {
                                select: {
                                    quantity: true
                                }
                            }
                        }
                    }
                }
            })

            if (body.status != null) {
                list = list.filter(function (l) {
                    return l.status == body.status
                })
            }

            const po_progress = []

            list.forEach(function (item) {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                po_progress.push(result)
            })

            return {
                status: true,
                data: {
                    po_progress,
                    list
                }
            }
        } catch (error) {
            console.error('listAllPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listPoDetail = async (id_po) => {
        try {
            id_po = parseInt(id_po)

            const schema = Joi.number().required()

            const validation = schema.validate(id_po)
    
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
    
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const check = await prisma.d_po.findFirst({
                where: {
                    id_po,
                    deleted_at: null
                }
            })

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const list = await prisma.d_po_detail.findMany({
                where: {
                    id_po
                }
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listPoDetail module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

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
            })

            const checkCompanyTo = await prisma.s_company.findFirst({
                where: {
                    id_company: body.order_to,
                    deleted_at: null
                }
            })

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
            })

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