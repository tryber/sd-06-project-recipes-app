import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import searchRecipesReducer from './reducers/searchRecipes';
import siteMapReducer from './reducers/sitemap';
import fetchReducer from './reducers/fetchmap';

const composedThunk = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);

const rootReducer = combineReducers({
  login: loginReducer,
  searchRecipes: searchRecipesReducer,
  sitemap: siteMapReducer,
  fetchmap: fetchReducer,
});

const recipesStore = createStore(rootReducer, composedThunk);

export default recipesStore;
