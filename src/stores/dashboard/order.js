import { defineStore } from 'pinia';
import * as s$order from '@/services/dashboard/order';

const d$order = defineStore({
    id: 'order',
    state: () => ({
        list_po: [],
        list_po_detail: [],
        po: {},
        detail: {},
        status: null,
    }),
    actions: {

        async a$inquiryAddOrder(id,body) {
            try {
                await s$order.add(id,body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        // async a$inquiryEdit(id, body) {
        //     try {
        //         await s$po.update(id, body);
        //     } catch ({ error, message }) {
        //         throw error ?? message;
        //     }
        // },
        // async a$inquiryDel(id) {
        //     try {
        //         await s$po.del(id);
        //     } catch ({ error, message }) {
        //         throw error ?? message;
        //     }
        // },
    },
    getters: {
        g$status: ({ status }) => status,
        g$po: ({ po }) => po,
        g$list_po_detail: ({ list_po_detail }) => list_po_detail,
        g$list_po: ({ list_po }) => list_po,
        g$detail: ({ detail }) => detail,
    },
});

export default d$order;
