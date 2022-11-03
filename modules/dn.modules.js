const prisma = require('../helpers/database')
const Joi = require('joi')
const { notify } = require('../helpers/notification')

class _dn {
    addDn = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_po: Joi.number().required(),
                id_doc: Joi.number().required()
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

            const checkCompany = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id_user,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            const checkPo = await prisma.d_po.findFirst({
                where: {
                    id_po: body.id_po,
                    order_to: checkCompany.id_company,
                    status: {
                        not: 1
                    },
                    finished_at: null,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkPo)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const list = await prisma.d_po_detail.findMany({
                where: {
                    id_po: body.id_po,
                    deleted_at: null
                },
                select: {
                    id_po_detail: true,
                    id_po: true,
                    id_order: true,
                    quantity: true,
                    d_order: {
                        select: {
                            quantity: true,
                            d_item: {
                                select: {
                                    name: true,
                                    serial_number: true
                                }
                            }
                        }
                    }
                }
            })

            let progress = []
            let result = 0

            list.forEach(function (item) {
                item.progress = item.quantity / item.d_order.quantity
                progress.push(item.progress)
            })

            progress.forEach(function (i) {
                result += i
            })

            result = result / progress.length

            if (result !== 1) {
                return {
                    status: false,
                    code: 403,
                    error: "Forbidden"
                }
            }

            const add = await prisma.d_dn.create({
                data: {
                    id_po: body.id_po,
                    id_doc: body.id_doc
                }
            })

            list.forEach(async e => {
                await prisma.d_dn_detail.create({
                    data: {
                        id_dn: add.id_dn,
                        id_order: e.id_order
                    }
                })

                const checkItemDetail = await prisma.d_item_detail.findFirst({
                    where: {
                        id_po_detail: e.id_po_detail
                    },
                    select: {
                        id_po_detail: true
                    }
                })

                await prisma.d_item_detail.delete({
                    where: {
                        id_item_detail: checkItemDetail.id_po_detail
                    }
                })
            })

            await prisma.d_po.update({
                where: {
                    id_po: body.id_po,
                },
                data: {
                    status: 1,
                    finished_at: new Date(Date.now())
                }
            })

            await notify(2, add.id_dn, checkCompany.id_company, checkPo.order_from)

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addDn module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _dn()