import { baseApi } from '@/utils/axios';

const api = `/po`;

const listAllPo = (options) => baseApi.get(`${api}/${options.tier}/${options?.status ?? '0'}`); //nullish coalescing
const listMyPo = (options) => baseApi.get(`${api}/my/${options?.status ?? ''}`); //nullish coalescing
const listInbox = (options) => baseApi.get(`${api}/incoming/${options?.status ?? ''}`); //nullish coalescing
const listPoDetail = (options) => baseApi.get(`${api}/detail/${options.id_po}`); //nullish coalescing
const getPoDetail = (options) => baseApi.get(`${api}/detail/${options.id_po}/${options.id_po_detail}`); //nullish coalescing
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    listAllPo, detail, add, update, del, listPoDetail, getPoDetail, listMyPo, listInbox
};