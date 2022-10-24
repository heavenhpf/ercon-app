import { baseApi } from '@/utils/axios';

const api = `/companies`;

const list = () => baseApi.get(`${api}`);
const name = () => baseApi.get(`${api}/name`);
const getMyCompany = () => baseApi.get(`${api}/my`);
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    list, detail, add, update, del, name, getMyCompany
};
