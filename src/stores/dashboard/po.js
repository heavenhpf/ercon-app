import { defineStore } from 'pinia';
import * as s$po from '@/services/dashboard/po';

const d$po = defineStore({
    id: 'po',
    state: () => ({
        list_po: [],
        list_my_po: [],
        list_inbox: [],
        list_po_detail: [],
        list_po_terdekat: [],
        get_po_detail: {},
        Addpo: {},
        detail: {},
        po: {},
        docPO: null,
        status: null,
    }),
    actions: {
        async a$listAllPo(options) {
            try {
                this.status = null;
                const { data, status } = await s$po.listAllPo(options);
                this.list_po = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$listMyPo(options) {
            try {
                this.status = null;
                const { data, status } = await s$po.listMyPo(options);
                this.list_my_po = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$listInbox(options) {
            try {
                this.status = null;
                const { data, status } = await s$po.listInbox(options);
                this.list_inbox = data ?? [];
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$getPoDetail(options) {
            try {
                this.status = null;
                const { data, status } = await s$po.getPoDetail(options);
                this.get_po_detail = data ?? {};
                this.status = status;
            } catch ({ error, message }) {
                this.status = false;
                throw error ?? message;
            }
        },
        async a$listPoDetail(options) {
            try {
                this.status = null;
                const { data, status } = await s$po.listPoDetail(options);
                this.po = data.po ?? {};
                this.list_po_detail = data.list ?? [];
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
                const { data } = await s$po.detail(id);
                this.detail = data;
            } catch ({ error, message }) {
                this.detail = {};
                throw error ?? message;
            }
        },
        async a$inquiryAddPO(body) {
            try {
                const {data} = await s$po.addPO(body);
                this.po = data ?? {};
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryAddDocPO(body) {
            try {
                const { data } = await s$po.addDocPO(body);
                this.docPO = data;
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryEdit(id, body) {
            try {
                await s$po.update(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$editPoDetail(id, body) {
            try {
                await s$po.editPoDetail(id, body);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$inquiryDel(id) {
            try {
                await s$po.del(id);
            } catch ({ error, message }) {
                throw error ?? message;
            }
        },
        async a$storePoData(data) {
            try {
                this.po = data ?? {}
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        g$status: ({ status }) => status,
        g$po: ({ po }) => po,
        g$AddPO: ({ po }) => po,
        g$DocPO: ({ docPO }) => docPO,
        g$list_po_detail: ({ list_po_detail }) => list_po_detail,
        g$list_po: ({ list_po }) => list_po,
        g$list_inbox: ({ list_inbox }) => list_inbox,
        g$list_my_po: ({ list_my_po }) => list_my_po,
        g$list_po_terdekat: ({ list_my_po }) => list_my_po.filter((item) => item.day_count < 7),
        g$list_po_selesai_terbaru: ({ list_my_po }) => list_my_po.filter((item) => item.day_count < 7 && item.status == 1),
        g$get_po_detail: ({ get_po_detail }) => get_po_detail,
        g$detail: ({ detail }) => detail,
    },
});

export default d$po;