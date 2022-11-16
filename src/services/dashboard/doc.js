import { baseApi } from '@/utils/axios';

const api = `/doc`;

const getDocPO = (options, body) => baseApi.get(`${api}/${options.id_doc}`, body);

export {
    getDocPO
};