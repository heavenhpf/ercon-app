import { defineStore } from 'pinia';
import * as s$order from '@/services/dashboard/order';

const d$order = defineStore({
    id: 'order',
    state: () => ({
        list_po: [],
        list_po_detail: [],
        getOrder: {},
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
        async a$getOrder(options) {
            try {
                this.status = null;
                const { data, status } = await s$order.getOrder(options);
                console.log("data",data);

                this.getOrder = data ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$inquiryEditOrder(id, body) {
            try {
                await s$order.updateOrder(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
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
        g$getOrder: ({ getOrder }) => getOrder,
    },
});

export default d$order;