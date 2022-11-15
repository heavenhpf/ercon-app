import { baseApi } from '@/utils/axios';

const api = `/items`;

const listAllItem = (options) => baseApi.get(`${api}/${options.tier}/${options?.category ?? ''}`); //nullish coalescing
const listMyItem = (options) => baseApi.get(`${api}/my/${options?.category ?? ''}`);
const getItem = (options) => baseApi.get(`${api}/item/${options.id}`);
const itemDetail = (options) => baseApi.get(`${api}/item/detail/${options.id}`);
const addItem = (body) => baseApi.post(`${api}`, body);
const editItem = (id, body) => baseApi.put(`${api}/${id}`, body);
const delItem = (id) => baseApi.delete(`${api}/${id}`);
const editItemQuantity = (id, body) => baseApi.put(`${api}/item/detail/${id}`, body);
const editBuffer = (id, body) => baseApi.put(`${api}/item/${id}`, body);


export {
    listAllItem, listMyItem, getItem, itemDetail, addItem, editItem, delItem, editItemQuantity, editBuffer
};