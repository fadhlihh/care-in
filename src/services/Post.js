import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const post = (path, data, config) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/${path}`, data, config).then(
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

export default post;
