import { AsyncStorage } from 'react-native';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', `bearer ${token}`);
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const Storage = {
  storeToken,
  getToken
};

export default Storage;
