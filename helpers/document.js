const prisma = require('../helpers/database')

class _document {
    addDoc = async (name, data) => {
        try {
            const add = await prisma.d_doc.create({
                data: {
                    name,
                    data
                },
                select: {
                    id_doc: true
                }
            })

            return add
        } catch (error) {
            console.error('addDoc module error: ', error)

            return false
        }
    }
}

module.exports = new _document()