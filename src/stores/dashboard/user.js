import { defineStore } from 'pinia';
import * as s$user from '@/services/dashboard/user';

const d$user = defineStore({
    id: 'user',
    state: () => ({
        user: [],
        username: '',
        detail: {},
        status: null,
    }),
    actions: {
        async a$inquiryList() {
            try {
                this.status = null;
                const { data, status } = await s$user.list();
                this.user = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$username() {
            try {
                this.status = null;
                const { data, status } = await s$user.username();
                this.username = data ?? '';
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
                const { data } = await s$user.detail(id);
                this.detail = data;
            } catch ({ error, message }) {
                this.detail = {};
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$user.add(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryEdit(id, body) {
            try {
                await s$user.update(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryDel(id) {
            try {
                await s$user.del(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$list: ({ user }) => user,
        g$username: ({ username }) => username,
        g$detail: ({ detail }) => detail,
    },
});

export default d$user;