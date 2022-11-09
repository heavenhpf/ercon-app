import { baseApi } from '@/utils/axios';

const api = `/po`;

const listAllPo = (options) => baseApi.get(`${api}/${options.tier}/${options?.status ?? ''}`); //nullish coalescing
const listMyPo = (options) => baseApi.get(`${api}/my/${options?.status ?? ''}`); //nullish coalescing
const listInbox = (options) => baseApi.get(`${api}/incoming/${options?.status ?? ''}`); //nullish coalescing
const addPo = (body) => baseApi.post(`${api}`, body);
const listPoDetail = (options) => baseApi.get(`${api}/detail/${options.id_po}`); //nullish coalescing
const getPoDetail = (options) => baseApi.get(`${api}/detail/${options.id_po}/${options.id_po_detail}`); //nullish coalescing
const editPoDetail = (options) => baseApi.put(`${api}/detail/${options.id_po}/${options.id_po_detail}`, body);
const detail = (id) => baseApi.get(`${api}/${id}`);

export {
    listAllPo, detail, addPo, editPoDetail, listPoDetail, getPoDetail, listMyPo, listInbox
};