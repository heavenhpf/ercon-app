import { defineStore } from 'pinia';
import * as s$inquiry from '@/services/dashboard/inquiry';

const d$inquiry = defineStore({
  id: 'inquiry',
  state: () => ({
    inquiry: [],
    detail: {},
    status: null,
  }),
  actions: {
    async a$inquiryList() {
      try {
        this.status = null;
        const { data, status } = await s$inquiry.list();
        this.inquiry = data ?? [];
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
        const { data } = await s$inquiry.detail(id);
        this.detail = data;
      } catch ({ error, message }) {
        this.detail = {};
        throw error ?? message;
      }
    },
    async a$inquiryAdd(body) {
      try {
        await s$inquiry.add(body);
      } catch ({ error, message }) {
        throw error ?? message;
      }
    },
    async a$inquiryEdit(id, body) {
      try {
        await s$inquiry.update(id, body);
      } catch ({ error, message }) {
        throw error ?? message;
      }
    },
    async a$inquiryDel(id) {
      try {
        await s$inquiry.del(id);
      } catch ({ error, message }) {
        throw error ?? message;
      }
    },
  },
  getters: {
    g$status: ({ status }) => status,
    g$list: ({ inquiry }) => inquiry,
    g$detail: ({ detail }) => detail,
  },
});

export default d$inquiry;
