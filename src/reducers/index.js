import { combineReducers } from 'redux';
import pathReducer from './pathReducer';

const reducer = combineReducers({
  paths: pathReducer,
})

export default reducer;