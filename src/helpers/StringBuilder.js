import { BASE_URL } from 'react-native-dotenv';

const addBaseURL = (string) => BASE_URL.slice(0, -7) + string;
const capitalizeLetter = (string) =>
  string[0].toUpperCase() + string.substring(1);

const StringBuilder = {
  addBaseURL,
  capitalizeLetter
};

export default StringBuilder;
