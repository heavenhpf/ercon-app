import { defineStore } from 'pinia';
import * as s$item from '@/services/dashboard/item';

const d$item = defineStore({
    id: 'item',
    state: () => ({
        listItem: [],
        myItem: [],
        item: {},
        label: [],
        status: null,
    }),
    actions: {
        async a$listAllItem(options) {
            try {
                this.status = null;
                const { data, status } = await s$item.listAllItem(options);
                this.listItem = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$listMyItem(options) {
            try {
                this.status = null;
                const { data, status } = await s$item.listMyItem(options);
                this.myItem = data ?? [];
                this.status = status;
                console.log(this.myItem);
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },

        async a$inquirygetItem(options) {
            try {
                this.item = {};
                const { data, status } = await s$item.getItem(options);
                this.label = data.label ?? [];
                this.item = data.item ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.label = {};
                this.item = {};
                throw error ?? message;
            }
        },
        async a$item(body) {
            try {
                await s$item.addItem(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$itemDetail(options) {
            try {
                this.status = null;
                const { data, status } = await s$item.itemDetail(options);
                this.item = data.item ?? [];
                this.label = data.label ?? {};
                this.status = status;
                console.log(this.myItem);
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$item.addItem(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryAdd(body) {
            try {
                await s$item.addItem(body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$deleteItem(id) {
            try {
                await s$item.delItem(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$editItem(id, body) {
            try {
                await s$item.editItem(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$editItemQuantity(id, body) {
            try {
                await s$item.editItemQuantity(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$editBuffer(id, body) {
            try {
                await s$item.editBuffer(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },


    },
    getters: {
        g$status: ({ status }) => status,
        g$listItem: ({ listItem }) => listItem,
        g$label: ({ label }) => label,
        g$item: ({ item }) => item,
        g$myItem: ({ myItem }) => myItem,
        // g$detail: ({ detail }) => detail,
    },
});

export default d$item;