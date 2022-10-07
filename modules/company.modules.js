const prisma = require('../helpers/database')
const Joi = require('joi')

class _company {
    listCompany = async () => {
        try {
            const list = await prisma.s_company.findMany({
                where: {
                    deleted_at: null
                },
                include: {
                    auth_user: {
                        select: {
                            username: true,
                            level: true
                        }
                    }
                }
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listCompany module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    editCompany = async (id_user, id_company, body) => {
        try {
            body = {
                id_user: parseInt(id_user),
                id_company: parseInt(id_company),
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_company: Joi.number().required(),
                name: Joi.string(),
                address: Joi.string(),
                phone: Joi.string()
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
                    id_company: body.id_company,
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

            const edit = await prisma.s_company.update({
                where: {
                    id_company: body.id_company
                },
                data: {
                    name: body.name,
                    address: body.address,
                    phone: body.phone
                }
            })

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editCompany module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteCompany = async (id) => {
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
            })

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.s_company.update({
                where: {
                    id_company: id
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
            console.error('deletemodule error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _company()