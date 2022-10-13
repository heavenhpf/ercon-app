import { baseApi } from '@/utils/axios';

const api = `/items`;

const list = (tier, category) => baseApi.get(`${api}`, {
    params: {
        tier,
        category
    }
});
const detail = (id) => baseApi.get(`${api}/${id}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {
    list, detail, add, update, del,
};
