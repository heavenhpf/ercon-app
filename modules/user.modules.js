const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _user {
    listUser = async () => {
        try {
            const list = await prisma.user.findMany({
                where: {
                    deleted_at: null
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUser user module Error ', error)

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

            body.password = bcrypt.hashSync(body.password, 10)

            const addUser = await prisma.user.create({
                data: {
                    username: body.username,
                    password: body.password,
                    level: body.level
                }
            }).finally(prisma.$disconnect())

            const addCompany = await prisma.company.create({
                data: {
                    id_user: addUser.id_user,
                    name: body.name,
                    address: body.address,
                    phone: body.phone,
                }
            }).finally(prisma.$disconnect())

            return {
                status: true,
                data: {
                    user: addUser,
                    company: addCompany
                }
            }
        } catch (error) {
            console.error('addUser user module Error: ', error)

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

            const check = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            id_user: id
                        },
                        // {
                        //     company: null
                        // }
                    ]
                }
            }).finally(prisma.$disconnect())

            console.log(check.company)

            if (!check) {
                return {
                    status: false,
                    code: 404,
                    error: "Data not found"
                }
            }

            const del = await prisma.user.update({
                where: {
                    id_user: id
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

module.exports = new _user()