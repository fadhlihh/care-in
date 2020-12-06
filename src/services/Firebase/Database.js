import database from '@react-native-firebase/database';

const addToken = (user) => {
  database()
    .ref(`/users/${user.userId}`)
    .set(user.token)
    .then(() => console.log(`Token successfully set : ${user.token}`));
};

const getToken = (userId) => {
  return database().ref(`/users/${userId}`).once('value');
};
const Database = {
  addToken,
  getToken
};

export default Database;
