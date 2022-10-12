import { defineStore } from 'pinia';
import * as s$item from '@/services/dashboard/item';

const d$item = defineStore({
    id: 'item',
    state: () => ({
        item: [],
        detail: {},
        status: null,
    }),
    actions: {
        async a$inquiryList() {
            try {
                this.status = null;
                const { data, status } = await s$item.list();
                this.item = data ?? [];
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
                const { data } = await s$item.detail(id);
                this.detail = data;
            } catch ({ error, message }) {
                this.detail = {};
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$item.add(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryEdit(id, body) {
            try {
                await s$item.update(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryDel(id) {
            try {
                await s$item.del(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$list: ({ item }) => item,
        g$detail: ({ detail }) => detail,
    },
});

export default d$item;
