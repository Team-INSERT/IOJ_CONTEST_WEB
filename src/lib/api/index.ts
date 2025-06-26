import axios from 'axios';
import { getRefreshToken } from './header';
import { TOKEN } from '../constants';
import { Storage } from '../util';

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 100000,
});

const refresh = async () => {
  await Storage.delItem(TOKEN.ACCESS);
  const refreshToken = await getRefreshToken();
  const { data } = await customAxios.post('/auth/reissue', {
    token: refreshToken,
  });
  const newAccessToken = data.accessToken;
  await Storage.setItem(TOKEN.ACCESS, newAccessToken);
  return newAccessToken;
};

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    try {
      request._retry = true;
      const newToken = await refresh();
      request.headers.Authorization = `Bearer ${newToken}`;
      return customAxios(request);
    } catch (refreshError) {
      Storage.clear();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

customAxios.interceptors.request.use(
  async (config) => {
    const token = await Storage.getItem(TOKEN.ACCESS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
