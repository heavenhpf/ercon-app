import { defineStore } from 'pinia';
import * as s$doc from '@/services/dashboard/doc';


const d$doc = defineStore({
    id: 'doc',
    state: () => ({
        doc: [],
    }),
    actions: {
        async a$getDocPO(options,body) {
            try {
                const { data } = await s$doc.getDocPO(options,body);
                this.doc = data;
            } catch ({ error, message }) {
                this.doc = [];
                throw error ?? message;
            }
        }
    },
    getters: {
        g$getDocPO: ({doc}) => doc,
    },
});

export default d$doc;