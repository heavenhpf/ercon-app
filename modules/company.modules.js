const prisma = require('../helpers/database')
const Joi = require('joi')

class _company {
    listCompany = async () => {
        try {
            const list = await prisma.company.findMany({
                where: {
                    deleted_at: null
                },
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listCompany user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    editCompany = async (id, body) => {
        try {
            body = {
                id: parseInt(id),
                ...body
            }

            const schema = Joi.object({
                id: Joi.number(),
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

            const check = await prisma.company.findFirst({
                where: {
                    id_company: body.id
                }
            }).finally(prisma.$disconnect())

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.company.update({
                where: {
                    id_company: body.id
                },
                data: {
                    name: body.name,
                    address: body.address,
                    phone: body.phone
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editCompany user module Error: ', error)

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

            const check = await prisma.company.findFirst({
                where: {
                    id_company: id
                }
            }).finally(prisma.$disconnect())

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.company.update({
                where: {
                    id_company: id
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteUser module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _company()