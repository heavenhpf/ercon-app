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
                    id_company: id,
                    deleted_at: null
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
                    id_company: id,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())
    
            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    getItem = async (id_company, id_item) => {
        try {
            const body = {
                id_company: parseInt(id_company),
                id_item: parseInt(id_item)
            }

            const schema = Joi.object({
                id_company: Joi.number().required(),
                id_item: Joi.number().required()
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
                    id_company: body.id_company,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_company: body.id_company,
                    id_item: body.id_item,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())
    
            if (!(checkCompany && checkItem)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            return {
                status: true,
                data: checkItem
            }
        } catch (error) {
            console.error('getItem module error: ', error)

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

            const checkCompany = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            }).finally(prisma.$disconnect())

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            if (!(checkCompany && checkUnit && checkCategory)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }
    
            const add = await prisma.d_item.create({
                data: {
                    id_company: checkCompany.id_company,
                    id_unit: body.id_unit,
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    serial_number: body.serial_number,
                    quantity: body.quantity,
                }
            }).finally(prisma.$disconnect())

            await prisma.d_item_detail.create({
                data: {
                    id_item: add.id_item,
                    quantity: add.quantity
                }
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteItem = async (id_user, id_item) => {
        try {
            const body = {
                id_user: parseInt(id_user),
                id_item: parseInt(id_item)
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item: Joi.number().required()
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
            }).finally(prisma.$disconnect())

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_company: checkCompany.id_company,
                    id_item: body.id_item,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())
            
            if (!(checkCompany && checkItem)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.d_item.update({
                where: {
                    id_item: body.id_item
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            }).finally(prisma.$disconnect())

            await prisma.d_item_detail.deleteMany({
                where: {
                    id_item: body.id_item
                }
            }).finally(prisma.$disconnect())
            
            return {
                status: true,
                data: del
            }

        } catch (error) {
            console.error('deleteItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editItem = async (id_user, id_item, body) => {
        try {
            body = {
                id_user: parseInt(id_user),
                id_item: parseInt(id_item),
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item: Joi.number().required(),
                id_unit: Joi.number().required(),
                id_category: Joi.number().required(),
                name: Joi.string(),
                desc: Joi.string(),
                serial_number: Joi.string()
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
            }).finally(prisma.$disconnect())

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_company: checkCompany.id_company,
                    id_item: body.id_item,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())
            
            if (!(checkCompany && checkItem && checkUnit && checkCategory)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.d_item.update({
                where: {
                    id_item: body.id_item
                },
                data: {
                    id_unit: body.id_unit,
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    serial_number: body.serial_number
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _item()