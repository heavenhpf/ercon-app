const prisma = require('../helpers/database')
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
}

module.exports = new _user()