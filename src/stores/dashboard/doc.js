import { defineStore } from 'pinia';
import * as s$doc from '@/services/dashboard/doc';


const d$doc = defineStore({
    id: 'doc',
    state: () => ({
        doc: [],
    }),
    actions: {
        async a$getDoc(options) {
            try {
                this.doc = await s$doc.getDoc(options);
            } catch ({ error, message }) {
                this.doc = [];
                throw error ?? message;
            }
        },

    },
    getters: {
        g$getDoc: ({ doc }) => doc,
    },
});

export default d$doc;