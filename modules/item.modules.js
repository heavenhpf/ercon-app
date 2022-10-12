const prisma = require('../helpers/database')
const Joi = require('joi')

class _item {
    listItem = async (tier, id_category) => {
        try {
            const body = {
                tier: parseInt(tier),
                id_category: (id_category) ? parseInt(id_category) : null
            }
    
            const schema = Joi.object({
                tier: Joi.number().required(),
                id_category: Joi.any()
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

            let list = await prisma.d_item.findMany({
                where: {
                    s_company: {
                        auth_user: {
                            level: body.tier
                        }
                    },
                    deleted_at: null
                },
                include: {
                    s_company: {
                        select: {
                            name: true,
                            auth_user: {
                                select: {
                                    level: true
                                }
                            }
                        }
                    }
                }
            })

            if (body.id_category !== null) {
                const check = await prisma.ref_category.findFirst({
                    where: {
                        id_category: body.id_category,
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

                list = list.filter(function (l) {
                    return l.id_category === body.id_category
                })
            }
    
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

    getItem = async (id_item) => {
        try {
            id_item = parseInt(id_item)

            const schema = Joi.number().required()

            const validation = schema.validate(id_item)
    
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
                    id_item,
                    deleted_at: null
                },
                include: {
                    s_company: {
                        select: {
                            name: true
                        }
                    },
                    ref_category: {
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

            const list = await prisma.d_item_detail.findMany({
                where: {
                    id_item
                },
                select: {
                    d_po_detail: {
                        select: {
                            quantity: true,
                            d_order: {
                                select: {
                                    quantity: true
                                }
                            },
                            d_po: {
                                select: {
                                    po_number: true,
                                    s_company_d_po_order_fromTos_company: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

            return {
                status: true,
                data: {
                    item: check,
                    label: list
                }
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
            })

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    deleted_at: null
                }
            })

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            })

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
            })

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_company: checkCompany.id_company,
                    id_item: body.id_item,
                    deleted_at: null
                }
            })
            
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
            })

            await prisma.d_item_detail.deleteMany({
                where: {
                    id_item: body.id_item
                }
            })
            
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
            })

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_company: checkCompany.id_company,
                    id_item: body.id_item,
                    deleted_at: null
                }
            })

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    deleted_at: null
                }
            })

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            })
            
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
            })

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