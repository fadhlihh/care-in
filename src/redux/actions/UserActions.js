import { UserConstants } from '../constants';

const setUser = (user) => ({ type: UserConstants.SET_USER, user });

const UserActions = {
  setUser
};

export default UserActions;
