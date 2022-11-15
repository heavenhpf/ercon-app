import { baseApi } from '@/utils/axios';

const api = `/orders`;

const add = (id,body) => baseApi.post(`${api}/${id}`, body);
const updateOrder = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);
const getOrder = (options) => baseApi.get(`${api}/${options.order_number}`);

export {
     add, del, getOrder, updateOrder
};