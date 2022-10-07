const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _user {
    listUser = async () => {
        try {
            const list = await prisma.auth_user.findMany({
                where: {
                    deleted_at: null
                }
            })

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUser module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    getUsername = async (username) => {
        try {
            const schema = Joi.string().required()

            const validation = schema.validate(username)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            return {
                status: true,
                data: username
            }
        } catch (error) {
            console.error('getUsername module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addUser = async (body) => {
        try {
            const schema = Joi.object({
                // table user
                username: Joi.string().required(),
                password: Joi.string().required(),
                level: Joi.number().required(),

                // table company
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
            console.error('addUser module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
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

            const checkUser = await prisma.auth_user.findFirst({
                where: {
                    id_user: id,
                    deleted_at: null
                }
            })

            const checkCompany = await prisma.s_company.findFirst({
                where: {
                    id_user: id,
                    deleted_at: {
                        not: null
                    }
                }
            })

            if (!(checkUser && checkCompany)) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.auth_user.update({
                where: {
                    id_user: id
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

module.exports = new _user()