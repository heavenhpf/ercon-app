const prisma = require('../helpers/database')
const Joi = require('joi')

class _dashboard {
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

    countPoStatus = async (id_user, status) => {
        try {
            const body = {
                id_user,
                status
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                status: Joi.number().required()
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
                    status: body.status,
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: count
            }
        } catch (error) {
            console.error('countPoStatus module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

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

    countSupplier = async (id_user) => {
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

            const count = await prisma.s_company.count()

            return {
                status: true,
                data: count - 1
            }
        } catch (error) {
            console.error('countSupplier module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

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

            const countBuffer = await prisma.d_item.aggregate({
                where: {
                    id_company: checkCompany.id_company,
                    deleted_at: null
                },
                _sum: {
                    quantity: true
                }
            })

            const listLabel = await prisma.d_item_detail.findMany({
                where: {
                    d_item: {
                        id_company: checkCompany.id_company,
                        deleted_at: null
                    }
                },
                select: {
                    d_po_detail: {
                        select: {
                            quantity: true
                        }
                    }
                }
            })

            let countLabel = 0

            listLabel.forEach((e) => {
                countLabel += e.d_po_detail.quantity
            })

            return {
                status: true,
                data: {
                    buffer: countBuffer._sum.quantity?? 0,
                    label: countLabel?? 0
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