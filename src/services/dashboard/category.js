import { baseApi } from '@/utils/axios';

const api = `/categories`;

const list = () => baseApi.get(`${api}`);

export {
  list
};
