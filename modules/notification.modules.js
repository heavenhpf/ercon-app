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
                select: {
                    d_notification_object: {
                        select: {
                            entity_type: true,
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
}

module.exports = new _notification()