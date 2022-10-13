import { baseApi } from '@/utils/axios';

const api = `/items`;

const listAllItem = (options) => baseApi.get(`${api}/${options.tier}/${options?.category ?? ''}`); //nullish coalescing
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    listAllItem, detail, add, update, del,
};
