const prisma = require('../helpers/database')

class _document {
    addDoc = async (doc) => {
        try {
            
        } catch (error) {
            console.error('addDoc module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _document()