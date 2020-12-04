import { combineReducers } from 'redux';
import userLogin from './login';
import mealsAndDrinksReducer from './mealsAndDrinks';

const rootReducer = combineReducers({ userLogin, mealsAndDrinksReducer });

export default rootReducer;
