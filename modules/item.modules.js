const prisma = require('../helpers/database')
const Joi = require('joi')

class _item {
    listItem = async (id) => {
        try {
            id = parseInt(id)
    
            const schema = Joi.number().required()
    
            const validation = schema.validate(id)
    
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
                    id_company: id
                },
                select: {
                    id_user: true
                }
            }).finally(prisma.$disconnect())
    
            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const list = await prisma.d_item.findMany({
                where: {
                    id_user: check.id_user,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())
    
            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listItem user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addItem = async (id, body) => {
        try {
            body = {
                id,
                ...body
            }
    
            const schema = Joi.object({
                id: Joi.number().required(),
                id_unit: Joi.number().required(),
                id_category: Joi.number().required(),
                name: Joi.string().required(),
                desc: Joi.string().required(),
                serial_number: Joi.string(),
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
    
            const add = await prisma.d_item.create({
                data: {
                    id_user: body.id,
                    id_unit: body.id_unit,
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    serial_number: body.serial_number,
                    quantity: body.quantity,
                }
            }).finally(prisma.$disconnect())

            const addDetail = await prisma.d_item_detail.create({
                data: {
                    id_item: add.id_item,
                    quantity: add.quantity
                }
            })

            return {
                status: true,
                data: {
                    ...add,
                    item_detail: addDetail
                }
            }
        } catch (error) {
            console.error('addItem user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteItem = async (id) => {
        try {
            id = parseInt(id)
            const schema = Joi.number().required()
            const validation = schema.validate(id)
    
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
    
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const check = await prisma.d_item.findUnique({
                where: {
                    id_item: id
                }
            }).finally(prisma.$disconnect())
            
            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.d_item.update({
                where: {
                    id_item: id
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            }).finally(prisma.$disconnect())

            const delDetail = await prisma.d_item_detail.deleteMany({
                where: {
                    id_item: id
                }
            }).finally(prisma.$disconnect())
            
            return {
                status: true,
                data: del
            }

        } catch (error) {
            console.error('deleteItem user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editItem = async (id, body) => {
        try {
            body = {
                id: parseInt(id),
                ...body
            }

            const schema = Joi.object({
                id: Joi.number(),
                id_unit: Joi.number(),
                id_category: Joi.number(),
                name: Joi.string().required(),
                desc: Joi.string().required(),
                serial_number: Joi.string().required(),
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

            const check = await prisma.d_item.findFirst({
                where: {
                    id_item: body.id
                }
            }).finally(prisma.$disconnect())

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.d_item.update({
                where: {
                    id_item: body.id
                },
                data: {
                    id_unit: body.id_unit,
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    serial_number: body.serial_number,
                    quantity: body.quantity

                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editItem user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _item()