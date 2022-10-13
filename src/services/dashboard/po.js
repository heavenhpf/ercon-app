import { baseApi } from '@/utils/axios';

const api = `/po`;

const listAllPo = (options) => baseApi.get(`${api}/${options.tier}/${options?.status ?? ''}`); //nullish coalescing
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    listAllPo, detail, add, update, del
};
