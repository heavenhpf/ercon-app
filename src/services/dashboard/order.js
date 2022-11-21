import { baseApi } from '@/utils/axios';

const api = `/orders`;

const add = (id,body) => baseApi.post(`${api}/${id}`, body);
const updateOrder = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);
const listOrder = (order_to) => baseApi.get(`${api}/${order_to}`);

export {
     add, del, listOrder, updateOrder
};