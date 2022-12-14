const prisma = require('../helpers/database')
const Joi = require('joi')

class _item {
    /**
     * List all items filtered by level and category
     * @param {number} level_user - level user
     * @param {number} tier - tier filter
     * @param {number} id_category - category filter
     */
    listItem = async (level_user, tier, id_category) => {
        try {
            const body = {
                level_user,
                tier,
                id_category: isFinite(id_category)? id_category : undefined
            }
    
            const schema = Joi.object({
                level_user: Joi.number().required(),
                tier: Joi.number().required(),
                id_category: Joi.number()
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

            if (body.tier <= body.level_user) {
                return {
                    status: false,
                    code: 403,
                    error: "You're not permitted"
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

            if (body.id_category !== undefined) {
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

    /**
     * List all items of the user logged in filtered by category
     * @param {number} id_user - id user
     * @param {number} id_category - category filter
     */
    listMyItem = async (id_user, id_category) => {
        try {
            const body = {
                id_user,
                id_category: isFinite(id_category)? id_category : undefined
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_category: Joi.number()
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

            if (!checkCompany) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            let list = await prisma.d_item.findMany({
                where: {
                    id_company: checkCompany.id_company,
                    deleted_at: null
                },
                include: {
                    ref_category: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            if (body.id_category !== undefined) {
                const checkCategory = await prisma.ref_category.findFirst({
                    where: {
                        id_category: body.id_category,
                        deleted_at: null
                    }
                })

                if (!checkCategory) {
                    return {
                        status: false,
                        code: 404,
                        error: "Data not found"
                    }
                }

                list = list.filter(async e => {
                    return e.id_category === body.id_category
                })
            }

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listMyItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Get item data of the user logged in
     * @param {number} id_user - id user
     * @param {number} level_user - level user
     * @param {number} id_item - id item
     */
    getItem = async (id_user, level_user, id_item) => {
        try {
            const body = {
                id_user,
                level_user,
                id_item
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                level_user: Joi.number().required(),
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
                    id_item: body.id_item,
                    deleted_at: null
                },
                include: {
                    s_company: {
                        select: {
                            id_company: true,
                            name: true,
                            auth_user: {
                                select: {
                                    level: true
                                }
                            }
                        }
                    },
                    ref_category: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            if (!(checkCompany && checkItem)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            if (checkItem.s_company.id_company !== checkCompany.id_company && checkItem.s_company.auth_user.level <= body.level_user) {
                return {
                    status: false,
                    code: 403,
                    error: "You're not permitted"
                }
            }

            const list = await prisma.d_item_detail.findMany({
                where: {
                    id_item: body.id_item
                },
                include: {
                    d_item: {
                        select: {
                            unit: true
                        }
                    },
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
                    item: checkItem,
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

    /**
     * Get item detail data
     * @param {number} id_item_detail - id item detail
     */
    getItemDetail = async (id_item_detail) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_item_detail)
    
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
    
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const checkItemDetail = await prisma.d_item_detail.findUnique({
                where: {
                    id_item_detail
                },
                select: {
                    id_item: true
                }
            })

            if (!checkItemDetail) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_item: checkItemDetail.id_item,
                    deleted_at: null
                }
            })

            if (!checkItem) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const get = await prisma.d_item_detail.findUnique({
                where: {
                    id_item_detail,
                },
                include: {
                    d_po_detail: {
                        select: {
                            d_po: {
                                select: {
                                    po_number: true
                                }
                            },
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

            return {
                status: true,
                data: {
                    item: checkItem,
                    label: get
                }
            }
        } catch (error) {
            console.error('getItemDetail module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Add new item
     * @param {number} id_user - id user
     * @param {*} body - item data
     */
    addItem = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }
    
            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_category: Joi.number().required(),
                name: Joi.string().required(),
                desc: Joi.string().required(),
                serial_number: Joi.string().required(),
                quantity: Joi.number().required(),
                unit: Joi.string().required()
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

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkCategory)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }
    
            const add = await prisma.d_item.create({
                data: {
                    id_company: checkCompany.id_company,
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    serial_number: body.serial_number,
                    quantity: body.quantity,
                    unit: body.unit
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

    /**
     * Remove item of the user logged in
     * @param {number} id_user - id user
     * @param {number} id_item - id item
     */
    deleteItem = async (id_user, id_item) => {
        try {
            const body = {
                id_user,
                id_item
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

    /**
     * Edit item of the user logged in
     * @param {number} id_user - id user
     * @param {number} id_item - id item
     * @param {*} body - item data
     */
    editItem = async (id_user, id_item, body) => {
        try {
            body = {
                id_user,
                id_item,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item: Joi.number().required(),
                id_category: Joi.number().required(),
                name: Joi.string(),
                desc: Joi.string(),
                unit: Joi.string(),
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

            const checkCategory = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id_category,
                    deleted_at: null
                }
            })
            
            if (!(checkCompany && checkItem && checkCategory)) {
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
                    id_category: body.id_category,
                    name: body.name,
                    desc: body.desc,
                    unit: body.unit,
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

    /**
     * Edit item quantity (specific label) of the user logged in
     * @param {number} id_user - id user
     * @param {number} id_item_detail - id item detail
     * @param {*} body - item detail data
     */
    editItemQuantity = async (id_user, id_item_detail, body) => {
        try {
            body = {
                id_user,
                id_item_detail,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item_detail: Joi.number().required(),
                is_buffer: Joi.bool().required(),
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

            const checkItemDetail = await prisma.d_item_detail.findUnique({
                where: {
                    id_item_detail: body.id_item_detail
                },
                select: {
                    id_item: true,
                    id_po_detail: true
                }
            })

            const checkItem = await prisma.d_item.findFirst({
                where: {
                    id_item: checkItemDetail.id_item,
                    deleted_at: null
                },
                select: {
                    quantity: true
                }
            })

            const checkPoDetail = await prisma.d_po_detail.findFirst({
                where: {
                    id_po_detail: checkItemDetail.id_po_detail,
                    deleted_at: null
                },
                select: {
                    id_po: true,
                    quantity: true,
                    d_order: {
                        select: {
                            quantity: true
                        }
                    }
                }
            })

            const checkPo = await prisma.d_po.findFirst({
                where: {
                    id_po: checkPoDetail.id_po,
                    order_to: checkCompany.id_company,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkItemDetail && checkPoDetail && checkPo && checkItem)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }
            
            if (body.is_buffer) {
                if (checkItem.quantity < body.quantity) {
                    return {
                        status: false,
                        code: 403,
                        error: "Buffer is not enough"
                    }
                }
            }

            if (checkPoDetail.quantity + body.quantity > checkPoDetail.d_order.quantity) {
                return {
                    status: false,
                    code: 403,
                    error: "Exceed ordered quantity"
                }
            }

            const edit = await prisma.d_po_detail.update({
                where: {
                    id_po_detail: checkItemDetail.id_po_detail
                },
                data: {
                    quantity: (checkPoDetail.quantity + body.quantity)
                }
            })

            if (body.is_buffer) {
                await prisma.d_item.update({
                    where: {
                        id_item: checkItemDetail.id_item
                    },
                    data: {
                        quantity: (checkItem.quantity - body.quantity)
                    }
                })
            }

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editItemQuantity module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Edit item quantity (buffer) of the user logged in
     * @param {number} id_user - id user
     * @param {number} id_item - id item
     * @param {*} body - item data
     */
    editBufferQuantity = async (id_user, id_item, body) => {
        try {
            body = {
                id_user,
                id_item,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_item: Joi.number().required(),
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
                    id_company: checkCompany.id_company,
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

            const edit = await prisma.d_item.update({
                where: {
                    id_item: body.id_item
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
            console.error('editBufferQuantity module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _item()