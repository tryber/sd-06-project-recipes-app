import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({ searchReducer });

export default rootReducer;
