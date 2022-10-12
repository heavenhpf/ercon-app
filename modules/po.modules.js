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
                    s_company_d_po_order_fromTos_company: {
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

            const progress = []

            list.forEach(function (item) {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                progress.push(result)
            })

            return {
                status: true,
                data: {
                    progress,
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

    listMyPo = async (id_user, status) => {
        try {
            const body = {
                id_user: parseInt(id_user),
                status: (status) ? parseInt(status) : null
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
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
                    s_company_d_po_order_fromTos_company: {
                        auth_user: {
                            id_user: body.id_user
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

            if (body.status !== null) {
                list = list.filter(function (l) {
                    return l.status === body.status
                })
            }

            const progress = []

            list.forEach(function (item) {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                progress.push(result)
            })

            return {
                status: true,
                data: {
                    progress,
                    list
                }
            }
        } catch (error) {
            console.error('listMyPo module error: ', error)

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
                },
                select: {
                    po_number: true,
                    deadline: true,
                    s_company_d_po_order_toTos_company: {
                        select: {
                            name: true
                        }
                    }
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
                    id_po,
                    deleted_at: null
                },
                include: {
                    d_order: {
                        select: {
                            quantity: true
                        }
                    }
                }
            })

            const progress = []

            list.forEach(function (item) {
                progress.push(item.quantity / item.d_order.quantity)
            })

            return {
                status: true,
                data: {
                    po: check,
                    progress,
                    list
                }
            }
        } catch (error) {
            console.error('listPoDetail module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    getPoDetail = async (id_po, id_po_detail) => {
        try {
            const body = {
                id_po: parseInt(id_po),
                id_po_detail: parseInt(id_po_detail)
            }

            const schema = Joi.object({
                id_po: Joi.number().required(),
                id_po_detail: Joi.number().required()
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

            const check = await prisma.d_po.findFirst({
                where: {
                    id_po: body.id_po,
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

            const get = await prisma.d_po_detail.findFirst({
                where: {
                    id_po: body.id_po,
                    id_po_detail: body.id_po_detail,
                    deleted_at: null
                },
                select: {
                    note: true,
                    note_po: true,
                    d_order: {
                        select: {
                            d_item: {
                                select: {
                                    serial_number: true,
                                    name: true,
                                    desc: true
                                }
                            }
                        }
                    },
                    d_po: {
                        select: {
                            deadline: true
                        }
                    }
                }
            })

            return {
                status: true,
                data: get
            }
        } catch (error) {
            console.error('getPoDetail module error: ', error)

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
                deadline: Joi.date().required(),
                order: Joi.array().required()
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
                    deadline: body.deadline
                }
            })

            body.order.forEach(async function (o) {
                const checkOrder = await prisma.d_order.findFirst({
                    where: {
                        id_order: o.id_order
                    },
                    select: {
                        id_item: true
                    }
                })

                const po_detail = await prisma.d_po_detail.create({
                    data: {
                        id_po: add.id_po,
                        id_order: o.id_order,
                        quantity: 0
                    }
                })

                await prisma.d_item_detail.create({
                    data: {
                        id_item: checkOrder.id_item,
                        id_po_detail: po_detail.id_po_detail
                    }
                })

                await prisma.d_order.update({
                    where: {
                        id_order: o.id_order
                    },
                    data: {
                        processed: true
                    }
                })
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