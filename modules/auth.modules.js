const prisma = require('../helpers/database')
const config = require('../config/app.config.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

class _auth {
    login = async (body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
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
                    username: body.username,
                    deleted_at: null
                },
                select: {
                    id_user: true,
                    username: true,
                    password: true
                }
            }).finally(prisma.$disconnect())

            if (!checkUser) {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, user not found'
                }
            }

            const checkPassword = bcrypt.compareSync(body.password, checkUser.password)

            if (!checkPassword) {
                return {
                    status: false,
                    code: 401,
                    error: 'Sorry, password not match'
                }
            }

            const payload = {
                id: checkUser.id_user,
                username: checkUser.username
            }

            const { secret, expired } = config.jwt

            const token = jwt.sign(payload, secret, { expiresIn: String(expired)} )
            const expiresAt = new Date( Date.now() + expired)

            return {
                status: true,
                data: {
                    token,
                    expiresAt
                }
            }
        } catch (error) {
            console.error('login auth module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _auth()