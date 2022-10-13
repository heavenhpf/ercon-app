import { defineStore } from 'pinia';
import * as s$po from '@/services/dashboard/po';

const d$po = defineStore({
    id: 'po',
    state: () => ({
        po: [],
        name: '',
        detail: {},
        status: null,
    }),
    actions: {
        async a$inquiryList(tier, statusPo) {
            try {
                this.status = null;
                const { data, status } = await s$po.listAllPo({ tier, status: statusPo });
                this.po = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },

        async a$name() {
            try {
                this.status = null;
                const { data, status } = await s$po.name();
                this.name = data ?? '';
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$inquiryDetail(id) {
            try {
                this.detail = {};
                if (!id) return;
                const { data } = await s$po.detail(id);
                this.detail = data;
            } catch ({ error, message }) {
                this.detail = {};
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$po.add(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryEdit(id, body) {
            try {
                await s$po.update(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryDel(id) {
            try {
                await s$po.del(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$list: ({ po }) => po,
        g$name: ({ name }) => name,
        g$detail: ({ detail }) => detail,
    },
});

export default d$po;
