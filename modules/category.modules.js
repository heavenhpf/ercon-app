const prisma = require('../helpers/database')
const Joi = require('joi')

class _category {
    addCategory = async (body) => {
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

            const add = await prisma.ref_category.create({
                data: {
                    name: body.name,
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addCategory user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listCategory = async () => {
        try {
            const list = await prisma.ref_category.findMany({
                where: {
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listCategory user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteCategory = async (id) => {
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

            const check = await prisma.ref_category.findFirst({
                where: {
                    id_category: id
                }
            }).finally(prisma.$disconnect())

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.ref_category.update({
                where: {
                    id_category: id
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
            console.error('deleteCategory module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editCategory = async (id, body) => {
        try {
            body = {
                id: parseInt(id),
                ...body
            }
            const schema = Joi.object({
                id: Joi.number().required(),
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

            const check = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id
                }
            }).finally(prisma.$disconnect())

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.ref_category.update({
                where: {
                    id_category: body.id
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
            console.error('editCompany user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _category()