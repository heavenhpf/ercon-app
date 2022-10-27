import { defineStore } from 'pinia';
import * as s$dashboard from '@/services/dashboard/dashboard';

const d$dashboard = defineStore({
    id: 'dashboard',
    state: () => ({
        detail: {},
        status: null,
        count: null,
    }),
    actions: {
        async a$countSupplier() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countSupplier();
                this.count = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$countDN() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countDN();
                this.count = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$countPO() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countPO();
                this.count = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$detail: ({ detail }) => detail,
        g$count: ({ count }) => count,
        g$countDN: ({ count }) => count,
        g$countPO: ({ count }) => count,
    },
});

export default d$dashboard;
