import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import loadReducer from './loadReducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  loadReducer
});

export default rootReducer;
