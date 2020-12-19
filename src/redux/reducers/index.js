import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import exploreReducer from './exploreReducer';
import recommendationsReducer from './recomendationsReducer';

const rootReducer = combineReducers({
  mainPageReducer,
  categoryReducer,
  searchReducer,
  recommendationsReducer,
  exploreReducer,
});

export default rootReducer;
