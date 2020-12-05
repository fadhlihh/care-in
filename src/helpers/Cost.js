const getTotal = (transaction) =>
  transaction.biayaAdmin + transaction.biayaJasa + transaction.biayaTranspor;

const getIncome = (transaction) =>
  transaction.biayaJasa + transaction.biayaTranspor;

const Cost = {
  getTotal,
  getIncome
};

export default Cost;
