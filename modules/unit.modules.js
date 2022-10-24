const prisma = require('../helpers/database')
const Joi = require('joi')

class _unit {
    listUnit = async () => {
        try {
            const list = await prisma.ref_unit.findMany({
                where: {
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUnit module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    addUnit = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
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

            const check = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id_user,
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
                    error: "Data not found"
                }
            }

            const add = await prisma.ref_unit.create({
                data: {
                    id_company: check.id_company,
                    name: body.name,
                }
            })

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addUnit module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editUnit = async (id_user, id_unit, body) => {
        try {
            body = {
                id_user,
                id_unit,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_unit: Joi.number().required(),
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

            const checkCompany = await prisma.s_company.findFirst({
                where: {
                    id_user: body.id_user,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    id_company: checkCompany.id_company,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkUnit)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const edit = await prisma.ref_unit.update({
                where: {
                    id_unit: body.id_unit
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
            console.error('editUnit module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUnit = async (id_user, id_unit) => {
        try {
            const body = {
                id_user,
                id_unit
            }

            const schema = Joi.object({
                id_unit: Joi.number().required(),
                id_user: Joi.number().required()
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
                    id_unit: body.id_unit,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            const checkUnit = await prisma.ref_unit.findFirst({
                where: {
                    id_unit: body.id_unit,
                    id_company: checkCompany.id_company,
                    deleted_at: null
                }
            })

            if (!(checkCompany && checkUnit)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.ref_unit.update({
                where: {
                    id_unit: body.id_unit
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
            console.error('deleteUnit module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _unit