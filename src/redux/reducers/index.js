import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import recommendationsReducer from './recomendationsReducer';
import exploreReducer from './exploreReducer';

const rootReducer = combineReducers({ 
    mainPageReducer,
    categoryReducer,
    searchReducer,
    recommendationsReducer,
    exploreReducer
});

export default rootReducer;
