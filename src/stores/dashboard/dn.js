import { defineStore } from 'pinia';
import * as s$dn from '@/services/dashboard/dn';


const d$dn = defineStore({
    id: 'dn',
    state: () => ({
        dn: [],
        docDn: null,
    }),
    actions: {
        async a$addDN(body) {
            try {
                await s$dn.addDN(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },

        async a$addDocDN(body) {
            try {
                const { data } = await s$dn.addDocDN(body);
                this.docDN = data;
            } catch ({ error, message }) {
                throw error ?? message;
            }
        }

    },
    getters: {
        g$DocDN: ({ docDN }) => docDN,
    },
});

export default d$dn;