const prisma = require('../helpers/database')
const Joi = require('joi')

class _dashboard {
    /**
     * Count all Purchase Order of the user logged in
     * @param {number} id_user - id of user
     */
    countPo = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
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

            const count = await prisma.d_po.count({
                where: {
                    order_from: checkCompany.id_company,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: count
            }
        } catch (error) {
            console.error('countPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all Purchase Order per status of the user logged in
     * @param {number} id_user - id of user
     */
    countPoStatus = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
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

            const countDeadline = await prisma.d_po.count({
                where: {
                    order_from: checkCompany.id_company,
                    status: -1,
                    deleted_at: null
                }
            })

            const countProgress = await prisma.d_po.count({
                where: {
                    order_from: checkCompany.id_company,
                    status: 0,
                    deleted_at: null
                }
            })

            const countDone = await prisma.d_po.count({
                where: {
                    order_from: checkCompany.id_company,
                    status: 1,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: {
                    deadline: countDeadline,
                    progress: countProgress,
                    done: countDone
                }
            }
        } catch (error) {
            console.error('countPoStatus module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all incoming Purchase Order of the user logged in
     * @param {number} id_user - id of user
     */
    countIncomingPo = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
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

            const count = await prisma.d_po.count({
                where: {
                    order_to: checkCompany.id_company,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: count
            }
        } catch (error) {
            console.error('countIncomingPo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all incoming Purchase Order per status of the user logged in
     * @param {number} id_user - id of user
     */
    countIncomingPoStatus = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
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

            const countDeadline = await prisma.d_po.count({
                where: {
                    order_to: checkCompany.id_company,
                    status: -1,
                    deleted_at: null
                }
            })

            const countProgress = await prisma.d_po.count({
                where: {
                    order_to: checkCompany.id_company,
                    status: 0,
                    deleted_at: null
                }
            })

            const countDone = await prisma.d_po.count({
                where: {
                    order_to: checkCompany.id_company,
                    status: 1,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: {
                    deadline: countDeadline,
                    progress: countProgress,
                    done: countDone
                }
            }
        } catch (error) {
            console.error('countIncomingPoStatus module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all Delivery Note of the user logged in
     * @param {number} id_user - id of user
     */
    countDn = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
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

            const count = await prisma.d_dn.count({
                where: {
                    d_po: {
                        order_from: checkCompany.id_company,
                    },
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: count
            }
        } catch (error) {
            console.error('countDn module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all suppliers below the user logged in
     * @param {number} id_user - id of user
     * @param {number} level - level of user
     */
    countSupplier = async (id_user, level) => {
        try {
            const body = {
                id_user,
                level
            }
            const schema = Joi.object({
                id_user: Joi.number().required(),
                level: Joi.number().required()
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

            const count = await prisma.s_company.count({
                where: {
                    auth_user: {
                        level: {
                            gt: body.level
                        }
                    },
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: count
            }
        } catch (error) {
            console.error('countSupplier module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Count all items of the user logged in
     * @param {number} id_user - id of user
     */
    countItem = async (id_user) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id_user)
    
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
                    id_user,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            const countItem = await prisma.d_item.count({
                where: {
                    id_company: checkCompany.id_company,
                    deleted_at: null
                }
            })

            const countLabel = await prisma.d_item_detail.count({
                where: {
                    d_item: {
                        id_company: checkCompany.id_company,
                        deleted_at: null
                    }
                }
            })

            return {
                status: true,
                data: {
                    item: countItem,
                    label: countLabel
                }
            }
        } catch (error) {
            console.error('countItem module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _dashboard()