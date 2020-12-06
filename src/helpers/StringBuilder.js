import { BASE_URL } from 'react-native-dotenv';
import currencyFormatter from 'currency-formatter';

const addBaseURL = (string) => BASE_URL.slice(0, -7) + string;
const capitalizeLetter = (string) =>
  string[0].toUpperCase() + string.substring(1);
const formatCurrency = (number) =>
  currencyFormatter.format(number, {
    decimal: ',',
    thousand: '.',
    precision: 0
  });

const StringBuilder = {
  addBaseURL,
  capitalizeLetter,
  formatCurrency
};

export default StringBuilder;
