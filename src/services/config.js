import { LocalStorage } from '../helpers';

const withToken = async (config) => {
  const token = await LocalStorage.getToken();
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const config = {
  withToken
};

export default config;
