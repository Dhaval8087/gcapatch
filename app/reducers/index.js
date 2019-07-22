// @flow
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';


export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
  });
}
