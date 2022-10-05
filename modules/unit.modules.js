const prisma = require('../helpers/database')
const Joi = require('joi')

class _unit {
    listUnit = async () => {
        try {
            const list = await prisma.ref_unit.findMany({
                where: {
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUnit user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    addUnit = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required()
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

            const add = await prisma.ref_unit.create({
                data: {
                    name: body.name,
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addUnit user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editUnit = async (id, body) => {
        try {
            body = {
                id: parseInt(id),
                ...body
            }
            const schema = Joi.object({
                id: Joi.number().required(),
                name: Joi.string()
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

            const check = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id,
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

            const edit = await prisma.ref_unit.update({
                where: {
                    id_unit: body.id
                },
                data: {
                    name: body.name,
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editUnit user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUnit = async (id) => {
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

            const check = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: id,
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

            const del = await prisma.ref_unit.update({
                where: {
                    id_unit: id
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
            console.error('deleteUnit module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _unit