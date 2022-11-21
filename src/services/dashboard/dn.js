import { baseApi } from '@/utils/axios';

const api = `/dn`;

const addDN = (body) => baseApi.post(`${api}`, body);

const addDocDN = (body) => baseApi.post(`/doc${api}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export {
    addDN, addDocDN
};