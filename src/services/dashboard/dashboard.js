import { baseApi } from '@/utils/axios';

const api = `/dashboard`;

const countPO = () => baseApi.get(`${api}/count/po`);
const countStatus = () => baseApi.get(`${api}/count/po/status`);
const countInbox = () => baseApi.get(`${api}/count/incoming_po/status`); //incoming po
const countInboxStatus = () => baseApi.get(`${api}/count/incoming_po/status`); //incoming po status
const countDN = () => baseApi.get(`${api}/count/dn`);
const countSupplier = () => baseApi.get(`${api}/count/supplier`);
const countItem = () => baseApi.get(`${api}/count/item`);

export {
    countSupplier, countDN, countPO, countStatus, countItem, countInbox, countInboxStatus
};