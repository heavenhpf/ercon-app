import { baseApi } from '@/utils/axios';

const api = `/dashboard`;

const countSupplier = () => baseApi.get(`${api}/count/supplier`);
const countDN = () => baseApi.get(`${api}/count/dn`);
const countPO = () => baseApi.get(`${api}/count/po`);
const countItem = () => baseApi.get(`${api}/count/item`);
const countStatus = () => baseApi.get(`${api}/count/po/status`);

export {
    countSupplier, countDN, countPO, countStatus, countItem
};