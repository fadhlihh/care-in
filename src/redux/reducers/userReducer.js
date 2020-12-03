import { UserConstants } from '../constants';

const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.SET_USER:
      return {
        user: action.user
      };
    default:
      return state;
  }
};

export default userReducer;
