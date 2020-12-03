import { AuthConstants } from '../constants';

const initialState = {
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthConstants.SET_TOKEN:
      return {
        token: action.token
      };
    default:
      return state;
  }
};

export default authReducer;
