import { baseApi } from '@/utils/axios';

const api = `/categories`;

const listAllCategories = () => baseApi.get(`${api}`);

export {
  listAllCategories
};
