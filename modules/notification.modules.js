const prisma = require('../helpers/database')
const Joi = require('joi')

class _notification {
    listNotification = async (id_user) => {
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

            const check = await prisma.s_company.findFirst({
                where: {
                    id_user,
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
                    error: 'Company not found'
                }
            }

            const list = await prisma.d_notification.findMany({
                where: {
                    id_company: check.id_company,
                },
                orderBy: {
                    d_notification_object: {
                        created_at: 'desc'
                    }
                },
                include: {
                    d_notification_object: {
                        select: {
                            entity_type: true,
                            entity_id: true,
                            created_at: true,
                            d_notification_change: {
                                select: {
                                    s_company: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                take: 3
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listNotification module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    readNotification = async (id_user, id_notification) => {
        try {
            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_notification: Joi.number().required()
            })

            const validation = schema.validate({ id_user, id_notification })
    
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
            
            const checkNotification = await prisma.d_notification.findFirst({
                where: {
                    id_notification,
                    id_company: checkCompany.id_company
                },
            })

            if (!(checkCompany && checkNotification)) {
                return {
                    status: false,
                    code: 404,
                    error: 'Data not found'
                }
            }

            const read = await prisma.d_notification.update({
                where: {
                    id_notification,
                },
                data: {
                    status: 1
                }
            })

            return {
                status: true,
                data: read
            }
        } catch (error) {
            console.error('readNotification module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _notification()