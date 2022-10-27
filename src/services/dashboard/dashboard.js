import { baseApi } from '@/utils/axios';

const api = `/dashboard`;

const countSupplier = () => baseApi.get(`${api}/count/supplier`);
const countDN = () => baseApi.get(`${api}/count/dn`);
const countPO = () => baseApi.get(`${api}/count/po`);

export {
    countSupplier, countDN, countPO
};
