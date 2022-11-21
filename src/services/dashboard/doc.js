import { baseApi } from '@/utils/axios';

const api = `/doc`;

const getDoc = (options) => baseApi.get(`${api}/${options.id_doc}`, {
    responseType: "arraybuffer"
});

export {
    getDoc
};