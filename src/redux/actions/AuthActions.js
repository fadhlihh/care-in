import { AuthConstants } from '../constants';

const setToken = (token) => ({ type: AuthConstants.SET_TOKEN, token });

const AuthActions = {
  setToken
};

export default AuthActions;
