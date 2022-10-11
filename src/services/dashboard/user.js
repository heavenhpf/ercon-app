import { baseApi } from '@/utils/axios';

const api = `/users`;

const list = () => baseApi.get(`${api}`);
const username = () => baseApi.get(`${api}/username`);
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    list, detail, add, update, del, username
};