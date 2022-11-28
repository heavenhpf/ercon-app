const prisma = require('../helpers/database')

const notify = async (entity_type, entity_id, actor, notifier) => {
    const notifObject = await prisma.d_notification_object.create({
        data: {
            entity_type,
            entity_id,
            status: 1
        }
    })

    await prisma.d_notification_change.create({
        data: {
            id_notification_object: notifObject.id_notification_object,
            id_company: actor,
            status: 1
        }
    })

    await prisma.d_notification.create({
        data: {
            id_notification_object: notifObject.id_notification_object,
            id_company: notifier,
            status: 0
        }
    })
}

module.exports = { notify }