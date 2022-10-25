const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
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

    getName = async (id_user) => {
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

            const get = await prisma.s_company.findFirst({
                where: {
                    id_user
                },
                select: {
                    name: true
                }
            })

            return {
                status: true,
                data: get
            }
        } catch (error) {
            console.error('getName module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    getMyCompany = async (id_user) => {
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

            const get = await prisma.s_company.findFirst({
                where: {
                    id_user
                }
            })

            return {
                status: true,
                data: get
            }
        } catch (error) {
            console.error('getCompany module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addCompany = async (body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
                level: Joi.number().required(),
                name: Joi.string().required(),
                address: Joi.string().required(),
                phone: Joi.string().required()
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

            const check = await prisma.auth_user.findUnique({
                where: {
                    username: body.username
                }
            })

            if (check) {
                return {
                    status: false,
                    code: 409,
                    error: "Data duplicate found"
                }
            }

            body.password = bcrypt.hashSync(body.password, 10)

            const addUser = await prisma.auth_user.create({
                data: {
                    username: body.username,
                    password: body.password,
                    level: body.level
                }
            })

            const addCompany = await prisma.s_company.create({
                data: {
                    id_user: addUser.id_user,
                    name: body.name,
                    address: body.address,
                    phone: body.phone,
                }
            })

            return {
                status: true,
                data: {
                    user: addUser,
                    company: addCompany
                }
            }
        } catch (error) {
            console.error('addCompany module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editMyCompany = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
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

            const edit = await prisma.s_company.update({
                where: {
                    id_company: check.id_company
                },
                data: {
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

            const checkUser = await prisma.auth_user.findFirst({
                where: {
                    id_user: id,
                    deleted_at: null
                }
            })

            const checkCompany = await prisma.s_company.findFirst({
                where: {
                    id_user: id,
                    deleted_at: null
                },
                select: {
                    id_company: true
                }
            })

            if (!(checkUser && checkCompany)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const delCompany = await prisma.s_company.update({
                where: {
                    id_company: checkCompany.id_company
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            })

            const delUser = await prisma.auth_user.update({
                where: {
                    id_user: id
                },
                data: {
                    deleted_at: new Date(Date.now())
                }
            })

            return {
                status: true,
                data: {
                    company: delCompany,
                    user: delUser
                }
            }
        } catch (error) {
            console.error('deleteCompany module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _company()