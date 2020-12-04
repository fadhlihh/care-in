import get from './Get';
import post from './Post';
import config from './config';

// Get
const getCheckAuth = async () => get('auth', await config.withToken());
const getUser = async (id) => get(`pasien/${id}`, await config.withToken());
const getWorker = async (params) =>
  get(`nakes`, await config.withToken(params));
const getTransaction = async (params) =>
  get('transaksi', await config.withToken(params));
const getMedicalHitory = async (id, params) =>
  get(`riwayat-kesehatan/${id}`, await config.withToken(params));

// Post
const postRegister = (data) => post('pasien', data);
const postCheckRegister = (data) => post('pasien?check', data);
const postGenerateToken = (data) => post('auth?remember=true', data);
const postOrder = async (id, data) =>
  post(`transaksi/${id}`, data, await config.withToken());

const Api = {
  getCheckAuth,
  getUser,
  getWorker,
  getTransaction,
  getMedicalHitory,
  postRegister,
  postCheckRegister,
  postGenerateToken,
  postOrder
};

export default Api;
