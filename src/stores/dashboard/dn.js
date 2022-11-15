import { defineStore } from 'pinia';
import * as s$dn from '@/services/dashboard/dn';

const d$dn = defineStore({
    id: 'dn',
    state: () => ({
        Dn: {},
        data: null,
        status: null,
    }),
    actions: {
        async a$addDn(body) {
            try {
                await s$dn.addDn(body)
            } catch (error) {
                throw error ?? message;
            }
        },
        async a$addDocDn(body) {
            try {
                const { data } = await s$dn.addDocDn(body);
                this.doc = data ?? null
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },

    },
    getters: {
        g$dn: ({ dn }) => dn,
        g$doc: ({ doc }) => doc
    }
});

export default d$dn;