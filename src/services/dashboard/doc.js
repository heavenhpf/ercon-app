import { baseApi } from '@/utils/axios';

const api = `/doc`;

const getDocPO = (options) => baseApi.get(`${api}/${options.id_doc}`, {
    responseType: "arraybuffer"
});

export {
    getDocPO
};