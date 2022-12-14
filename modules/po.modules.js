const prisma = require('../helpers/database')
const Joi = require('joi')
const { notify } = require('../helpers/notification')

class _po {
    /**
     * List all Purchase Order filtered by tier and status, only shows Purchase Order below the level of the user logged in
     * @param {number} level - level of user
     * @param {number} tier - tier filter
     * @param {number} status - status filter
     */
    listAllPo = async (level, tier, status) => {
        try {
            const body = {
                level,
                tier,
                status: isFinite(status)? status : undefined
            }

            const schema = Joi.object({
                level: Joi.number().required(),
                tier: Joi.number().required(),
                status: Joi.number()
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

            if (body.tier <= body.level) {
                return {
                    status: false,
                    code: 403,
                    error: "Forbidden"
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
                                    id_order: true,
                                    quantity: true
                                }
                            }
                        }
                    }
                }
            })

            if (body.status !== undefined) {
                list = list.filter(function (l) {
                    return l.status === body.status
                })
            }

            list.forEach((item) => {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                item.progress = result

                const diff = new Date() - item.deadline
                item.day_count = Math.ceil(diff / (1000 * 60 * 60 * 24))
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listAllPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * List all Purchase Order of the user logged in filtered by status
     * @param {number} id_user - id of user
     * @param {number} status - status filter
     */
    listMyPo = async (id_user, status) => {
        try {
            const body = {
                id_user,
                status: isFinite(status)? status : undefined
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                status: Joi.number()
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

            if (body.status !== undefined) {
                list = list.filter(function (l) {
                    return l.status === body.status
                })
            }

            list.forEach((item) => {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                item.progress = result

                const diff = new Date() - item.deadline
                item.day_count = Math.ceil(diff / (1000 * 60 * 60 * 24))
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listMyPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * List all incoming Purchase Order to the user logged in filtered by status
     * @param {number} id_user - id of user
     * @param {number} status - status filter
     */
    listIncomingPo = async (id_user, status) => {
        try {
            const body = {
                id_user,
                status: isFinite(status)? status : undefined
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                status: Joi.number()
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
                            id_user: body.id_user
                        }
                    },
                    deleted_at: null
                },
                include: {
                    s_company_d_po_order_fromTos_company: {
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

            if (body.status !== undefined) {
                list = list.filter(function (l) {
                    return l.status === body.status
                })
            }

            list.forEach((item) => {
                let result = 0

                item.d_po_detail.forEach(function (item2) {
                    result += item2.quantity / item2.d_order.quantity
                })

                result = result / item.d_po_detail.length
                item.progress = result

                const diff = new Date() - item.deadline
                item.day_count = Math.ceil(diff / (1000 * 60 * 60 * 24))
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listIncomingPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * List all Purchase Order detail (items ordered) of specific Purchase Order
     * @param {number} id_po - id of Purchase Order
     */
    listPoDetail = async (id_po) => {
        try {
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
                include: {
                    s_company_d_po_order_fromTos_company: {
                        select: {
                            name: true
                        }
                    },
                    s_company_d_po_order_toTos_company: {
                        select: {
                            name: true
                        }
                    },
                    d_dn: {
                        select: {
                            id_doc: true
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
                select: {
                    id_po_detail: true,
                    id_po: true,
                    id_order: true,
                    quantity: true,
                    d_order: {
                        select: {
                            id_item: true,
                            quantity: true,
                            d_item: {
                                select: {
                                    name: true,
                                    serial_number: true,
                                    unit: true
                                }
                            }
                        }
                    },
                    d_item_detail: {
                        select: {
                            id_item_detail: true,
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

            check.progress = result / progress.length

            return {
                status: true,
                data: {
                    po: check,
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

    /**
     * Get detail of specific items ordered in Purchase Order
     * @param {number} id_po - id of Purchase Order
     * @param {number} id_po_detail - id of Purchase Order detail
     */
    getPoDetail = async (id_po, id_po_detail) => {
        try {
            const body = {
                id_po,
                id_po_detail
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

    /**
     * Edit specific items ordered in Purchase Order
     * @param {number} id_user - id of user
     * @param {number} id_po - id of Purchase Order
     * @param {number} id_po_detail - id of Purchase Order detail
     * @param {*} body - Purchase Order detail data
     */
    editPoDetail = async (id_user, id_po, id_po_detail, body) => {
        try {
            body = {
                id_user,
                id_po,
                id_po_detail,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_po: Joi.number().required(),
                id_po_detail: Joi.number().required(),
                note: Joi.string(),
                note_po: Joi.string()
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
                    deleted_at: null
                }
            })

            const checkPoDetail = await prisma.d_po_detail.findFirst({
                where: {
                    id_po_detail: body.id_po_detail,
                    id_po: body.id_po,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkPo && checkPoDetail)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.d_po_detail.update({
                where: {
                    id_po_detail: body.id_po_detail,
                },
                data: {
                    note: body.note,
                    note_po: body.note_po
                }
            })

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editPoDetail module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Add new Purchase Order
     * @param {number} id_user - id of user
     * @param {*} body - Purchase Order data
     */
    addPo = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_doc: Joi.number().required(),
                order_to: Joi.number().required(),
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

            let checkOrder = new Set()

            body.order.forEach(async (o) => {
                const check = await prisma.d_order.findFirst({
                    where: {
                        id_order: o.id_order,
                        order_to: body.order_to,
                        processed: false,
                        deleted_at: null
                    },
                    select: {
                        id_order: true
                    }
                })

                if (check) {
                    checkOrder.add(check.id_order)
                }
            })

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
            } else if (checkOrder.size !== body.order.length) {
                return {
                    status: false,
                    code: 403,
                    error: "Something's wrong with order list"
                }
            }

            const add = await prisma.d_po.create({
                data: {
                    id_doc: body.id_doc,
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

            await notify(1, add.id_po, add.order_from, add.order_to)

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