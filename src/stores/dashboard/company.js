import { defineStore } from 'pinia';
import * as s$company from '@/services/dashboard/company';

const d$company = defineStore({
    id: 'company',
    state: () => ({
        company: [],
        getmyCompany: {},
        name: '',
        detail: {},
        status: null,
    }),
    actions: {
        async a$inquiryList() {
            try {
                this.status = null;
                const { data, status } = await s$company.list();
                this.company = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$getMyCompany() {
            try {
                this.status = null;
                const { data, status } = await s$company.getMyCompany();
                this.getmyCompany = data ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },

        async a$name() {
            try {
                this.status = null;
                const { data, status } = await s$company.name();
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
                const { data } = await s$company.detail(id);
                this.detail = data;
            } catch ({ error, message }) {
                this.detail = {};
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$company.add(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        // async a$inquiryEdit(id, body) {
        //     try {
        //         await s$company.update(id, body);
        //     } catch ({ error, message }) {
        //         throw error ?? message;
        //     }
        // },
        async a$editMyCompany(body) {
            try {
                await s$company.editMyCompany(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryDel(id) {
            try {
                await s$company.del(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$listCompany: ({ company }) => company,
        g$name: ({ name }) => name,
        g$detail: ({ detail }) => detail,
        g$getMyCompany: ({ getmyCompany }) => getmyCompany,
    },
});

export default d$company;