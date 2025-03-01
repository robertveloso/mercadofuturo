import { combineReducers } from 'redux';

// Import reducers
import auth from './auth/reducer';
import user from './user/reducer';
import cart from './cart/reducer';

export default combineReducers({
  auth,
  user,
  cart,
});
