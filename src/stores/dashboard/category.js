import { defineStore } from 'pinia';
import * as s$category from '@/services/dashboard/category';

const d$category = defineStore({
  id: 'category',
  state: () => ({
    category: [],
    // detail: {},
    status: null,
  }),
  actions: {
    async a$categoryList() {
      try {
        this.status = null;
        const { data, status } = await s$category.listAllCategories();
        console.log("a$categoryList",data);
        this.category = data ?? [];
        this.status = status;
      } catch ({ error, message }) {
        this.status = false;
        throw error ?? message;
      }
    },
  },
  getters: {
    g$status: ({ status }) => status,
    g$listCategory: ({ category }) => category,
  },
});

export default d$category;
