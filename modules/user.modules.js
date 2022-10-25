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

    editPassword = async (id_user, body) => {
        try {
            body = {
                id_user,
                ...body
            }

            const schema = Joi.object({
                id_user: Joi.number().required(),
                cur_password: Joi.string().required(),
                new_password: Joi.string().required()
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

            const checkUser = await prisma.auth_user.findFirst({
                where: {
                    id_user: body.id_user,
                    deleted_at: null
                }
            })

            if (!checkUser) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, user not found'
                }
            }

            const checkPassword = bcrypt.compareSync(body.cur_password, checkUser.password)

            if (!checkPassword) {
                return {
                    status: false,
                    code: 401,
                    error: 'Sorry, password not match'
                }
            }

            body.new_password = bcrypt.hashSync(body.new_password, 10)

            await prisma.auth_user.update({
                where: {
                    id_user: body.id_user
                },
                data: {
                    password: body.new_password
                }
            })

            return {
                status: true,
                code: 201,
                data: 'Password updated'
            }
        } catch (error) {
            console.error('editPassword module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()