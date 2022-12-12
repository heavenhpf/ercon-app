import { defineStore } from 'pinia';
import * as s$notification from '@/services/dashboard/notification';

const d$notification = defineStore({
    id: 'notification',
    state: () => ({
        listNotification: [],
        status: null,
    }),
    actions: {
        async a$listNotification() {
            try {
                const { data, status } = await s$notification.listNotification();
                this.listNotification = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },

        async a$readNotification(id_notification) {
            try {
                const { status } = await s$notification.readNotification(id_notification);
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        }
    },
    getters: {
        g$listNotification: ({listNotification}) => listNotification,
    }
});

export default d$notification;