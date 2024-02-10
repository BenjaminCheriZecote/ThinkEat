import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import ingredientsReducer from './ingredientsReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  ingredients: ingredientsReducer
});

export default rootReducer;