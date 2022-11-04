import { defineStore } from 'pinia';
import * as s$dashboard from '@/services/dashboard/dashboard';

const d$dashboard = defineStore({
    id: 'dashboard',
    state: () => ({
        detail: {},
        status: null,
        count: null,
        countDN: null,
        countPO: null,
        countStatus: {},
        countItem: {},
        countInbox: {},
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
        async a$countStatus() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countStatus();
                this.countStatus = data ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$countItem() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countItem();
                this.countItem = data ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$countInbox() {
            try {
                this.status = null;
                const { data, status } = await s$dashboard.countInbox();
                this.countInbox = data ?? {};
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
                this.countDN = data ?? [];
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
                this.countPO = data ?? [];
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
        g$countDN: ({ countDN }) => countDN,
        g$countPO: ({ countPO }) => countPO,
        g$countStatus: ({ countStatus }) => countStatus,
        g$countItem: ({ countItem }) => countItem,
        g$countInbox: ({ countInbox }) => countInbox,
    },
});

export default d$dashboard;