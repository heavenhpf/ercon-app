import { baseApi } from '@/utils/axios';

const api = `/items`;

const listAllItem = (options) => baseApi.get(`${api}/${options.tier}/${options?.category ?? ''}`); //nullish coalescing
const getItem = (options) => baseApi.get(`${api}/item/${options.id}`);
const listMyItem = (options) => baseApi.get(`${api}/my/${options?.category ?? ''}`);
const addItem = (body) => baseApi.post(`${api}`, body);
const updateItem = (id, body) => baseApi.put(`${api}/${id}`, body);
const delItem = (id) => baseApi.delete(`${api}/${id}`);

export {
    listAllItem, getItem, addItem, updateItem, delItem, listMyItem
};