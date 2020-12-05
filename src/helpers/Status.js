import { OrderStatus } from '../constant';

const getStatus = (status) => {
  switch (status) {
    case 'pending':
      return OrderStatus.PENDING;
    case 'berjalan':
      return OrderStatus.ACTIVE;
    case 'selesai':
      return OrderStatus.INACTIVE;
    default:
      return null;
  }
};

const validToGetPatientLocation = (status) => {
  switch (status) {
    case OrderStatus.ACTIVE:
      return true;
    case OrderStatus.INACTIVE:
      return false;
    case OrderStatus.PENDING:
      return true;
    case OrderStatus.NOTRANCACTION:
      return false;
    default:
      return false;
  }
};

const Status = {
  getStatus,
  validToGetPatientLocation
};

export default Status;
