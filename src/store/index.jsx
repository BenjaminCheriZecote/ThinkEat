import favoritesReducer from "./reducers/favorites";
import historcalPropositionsReducer from "./reducers/historical_propositions";
import sessionReducer from "./reducers/session";
import recipesReducer from "./reducers/recipes";			
import { configureStore } from "@reduxjs/toolkit";
import criteriasReducer from "./reducers/criterias";
import filtersReducer from "./reducers/filters/filters";
import ingredientsReducer from "./reducers/ingredients";				
import familiesReducer from "./reducers/families";
				
const store = configureStore({				
	reducer: {
		favorites:favoritesReducer, 
		historical_propositions:historcalPropositionsReducer,
		session:sessionReducer,
		recipes:recipesReducer, 
		criterias:criteriasReducer,
		filters:filtersReducer,
		ingredients:ingredientsReducer,
		families:familiesReducer
	}			
})				
				
export default store;				
				
				
				