import get from './Get';
import post from './Post';
import put from './Put';
import drop from './Drop';
import config from './config';

// Get
const getCheckAuth = async () => get('auth', await config.withToken());
const getUser = async (id) => get(`pasien/${id}`, await config.withToken());
const getWorker = async (params) =>
  get(`nakes`, await config.withToken(params));
const getTransaction = async (params) =>
  get('transaksi', await config.withToken(params));
const getTransactionWorker = async (params) =>
  get('transaksi?user=nakes', await config.withToken(params));
const getMedicalHitory = async (id, params) =>
  get(`riwayat-kesehatan/${id}`, await config.withToken(params));
const getChat = async (id) =>
  get(`transaksi/${id}/chat`, await config.withToken());

// Post
const postRegister = (data) => post('pasien', data);
const postCheckRegister = (data) => post('pasien?check', data);
const postGenerateToken = (data) => post('auth?remember=true', data);
const postGenerateTokenWorker = (data) =>
  post('auth?login=nakes&remember=true', data);
const postOrder = async (id, data) =>
  post(`transaksi/${id}`, data, await config.withToken());
const postMedicalHistory = async (id, data) =>
  post(`riwayat-kesehatan/${id}`, data, await config.withToken());
const postChat = async (id, data) =>
  post(`transaksi/${id}/chat`, data, await config.withToken());

// Put
const putUser = async (id, data) =>
  put(`pasien/${id}`, data, await config.withToken());
const putTransaction = async (id, data) =>
  put(`transaksi/${id}`, data, await config.withToken());
const putMedicalHistory = async (id, data) =>
  put(`riwayat-kesehatan/${id}`, data, await config.withToken());
const putWorker = async (id, data) =>
  put(`nakes/${id}`, data, await config.withToken());

// Delete
const deleteMedicalHistory = async (id) =>
  drop(`riwayat-kesehatan/${id}`, await config.withToken());

const Api = {
  getCheckAuth,
  getUser,
  getWorker,
  getTransaction,
  getTransactionWorker,
  getMedicalHitory,
  getChat,
  postRegister,
  postCheckRegister,
  postGenerateToken,
  postGenerateTokenWorker,
  postMedicalHistory,
  postOrder,
  postChat,
  putUser,
  putTransaction,
  putMedicalHistory,
  putWorker,
  deleteMedicalHistory
};

export default Api;
