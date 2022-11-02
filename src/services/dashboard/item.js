import { baseApi } from '@/utils/axios';

const api = `/items`;

const listAllItem = (options) => baseApi.get(`${api}/${options.tier}/${options?.category ?? ''}`); //nullish coalescing
const getItem = (options) => baseApi.get(`${api}/item/${options.id}`);
const listMyItem = (options) => baseApi.get(`${api}/my/${options?.category ?? ''}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    listAllItem, getItem, add, update, del,listMyItem
};
