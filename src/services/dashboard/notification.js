import { baseApi } from '@/utils/axios';

const api = `/notification`;

const listNotification = () => baseApi.get(`${api}`);

export {
    listNotification,
}