import AsyncStorage from '@react-native-community/async-storage';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token set!', token);
  } catch (error) {
    console.log('Token is not set', error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log('Failed to get token : ', error);
    return null;
  }
};

const storeUserType = async (type) => {
  try {
    await AsyncStorage.setItem('userType', type);
    console.log('User type set!', type);
  } catch (error) {
    console.log('User type is not set', error);
  }
};

const getUserType = async () => {
  try {
    return await AsyncStorage.getItem('userType');
  } catch (error) {
    console.log('Failed to get user type : ', error);
    return null;
  }
};

const LocalStorage = {
  storeToken,
  getToken,
  storeUserType,
  getUserType
};

export default LocalStorage;
