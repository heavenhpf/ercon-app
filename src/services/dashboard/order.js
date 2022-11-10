import { baseApi } from '@/utils/axios';

const api = `/orders`;

const add = (id,body) => baseApi.post(`${api}/${id}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);
const getOrder = (body) => baseApi.get(`${api}`, body);

export {
     add, update, del, getOrder
};