const DONE = {
  status: 'selesai',
  berhasil: true
};

const FAILED = {
  status: 'selesai',
  berhasil: false
};

const ONPROCCESS = {
  status: 'berjalan',
  berhasil: true
};

const TransactionStatus = {
  DONE,
  FAILED,
  ONPROCCESS
};

export default TransactionStatus;
