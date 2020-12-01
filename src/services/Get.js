import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const Get = (path) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${path}`).then(
      (result) => {
        resolve(result.data);
      },
      (err) => {
        reject(err);
      }
    );
  });

  return promise;
};

export default Get;
