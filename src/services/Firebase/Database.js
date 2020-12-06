import database from '@react-native-firebase/database';

const addToken = (user) => {
  database()
    .ref(`/users/${user.userId}`)
    .set(user.token)
    .then(() => console.log(`Token successfully set : ${user.token}`));
};

const Database = {
  addToken
};

export default Database;
