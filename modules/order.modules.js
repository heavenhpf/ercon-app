const prisma = require('../helpers/database')
const Joi = require('joi')

class _order {
    getOrder = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                order_number: Joi.string().required()
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

            const check = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id_user,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const get = await prisma.d_order.findFirst({
                where: {
                    order_number: body.order_number,
                    order_from: check.id_company,
                    processed: false,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: get
            }
        } catch (error) {
            console.error('getOrder module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    addOrder = async (id_user, id_item, body) => {
        try {
            body = {
                id_user: parseInt(id_user),
                id_item: parseInt(id_item),
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item: Joi.number().required(),
                order_number: Joi.string().required(),
                quantity: Joi.number().required()
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

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_item: body.id_item,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            if (!(checkCompany && checkItem)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const checkOrder = await prisma.d_order.findFirst({
                where: {
                    order_number: body.order_number,
                    deleted_at: null
                }
            })

            if (checkOrder) {
                return {
                    status: false,
                    code: 403,
                    error: "Data duplicate found"
                }
            }

            const add = await prisma.d_order.create({
                data: {
                    order_from: checkCompany.id_company,
                    order_to: checkItem.id_company,
                    id_item: body.id_item,
                    order_number: body.order_number,
                    quantity: body.quantity,
                    processed: false
                }
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addOrder module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    editOrder = async (id_user, id_order, body) => {
        try {
            body = {
                id_user: parseInt(id_user),
                id_order: parseInt(id_order),
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_order: Joi.number().required(),
                quantity: Joi.number()
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

            const checkOrder = await prisma.d_order.findFirst({
                where: {
                    id_order: body.id_order,
                    order_from: checkCompany.id_company,
                    processed: false,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkOrder)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.d_order.update({
                where: {
                    id_order: body.id_order
                },
                data: {
                    quantity: body.quantity
                }
            })

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editOrder module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteOrder = async (id_user, id_order) => {
        try {
            const body = {
                id_user: parseInt(id_user),
                id_order: parseInt(id_order)
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_order: Joi.number().required()
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

            const checkOrder = await prisma.d_order.findFirst({
                where: {
                    id_order: body.id_order,
                    order_from: checkCompany.id_company,
                    processed: false,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkOrder)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.d_order.update({
                where: {
                    id_order: body.id_order
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            })

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteOrder module error ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _order()