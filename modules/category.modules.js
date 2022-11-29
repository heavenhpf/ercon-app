const prisma = require('../helpers/database')
const Joi = require('joi')

class _category {
    /**
     * List all categories
     */
    listCategory = async () => {
        try {
            const list = await prisma.ref_category.findMany({
                where: {
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listCategory module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Add new category
     * @param {*} body - category data
     */
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
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addCategory module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Remove category
     * @param {number} id - id of category
     */
    deleteCategory = async (id) => {
        try {
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
                    id_category: id,
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

            const del = await prisma.ref_category.update({
                where: {
                    id_category: id
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
            console.error('deleteCategory module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    /**
     * Edit category
     * @param {number} id - id of category
     * @param {*} body - category data
     */
    editCategory = async (id, body) => {
        try {
            body = {
                id,
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

            const check = await prisma.ref_category.findFirst({
                where: {
                    id_category: body.id,
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

            const edit = await prisma.ref_category.update({
                where: {
                    id_category: body.id
                },
                data: {
                    name: body.name,
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
}

module.exports = new _category()