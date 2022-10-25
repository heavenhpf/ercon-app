import { baseApi } from '@/utils/axios';

const api = `/`;

const login = (body) => baseApi.post(`${api}login`, body);

export { login };
