import { baseApi } from '@/utils/axios';

const api = `/notification`;

const listNotification = () => baseApi.get(`${api}`);

const readNotification = (id_notification) => baseApi.post(`${api}/${id_notification}`);

export {
    listNotification, readNotification,
}