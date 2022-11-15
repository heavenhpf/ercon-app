import { baseApi } from '@/utils/axios';

const api = `/dn`;

const addDn = (body) => baseApi.post(`${api}`, body);
const addDocDn = (body) => baseApi.post(`/doc${api}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export {
    addDn, addDocDn
};
