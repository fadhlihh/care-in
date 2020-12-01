import get from './get';
import post from './post';

// Get
const getNakes = (config) => get('nakes', config);

// Post
const postRegister = (data) => post('pasien', data);
const postCheckRegister = (data) => post('pasien?check', data);
const postGenerateToken = (data) => post('auth?remember=true', data);

const Api = {
  getNakes,
  postRegister,
  postCheckRegister,
  postGenerateToken
};

export default Api;
