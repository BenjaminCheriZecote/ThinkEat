import favoritesReducer from "./reducers/favorites";
import historicalPropositionsReducer from "./reducers/historical_propositions";
import sessionReducer from "./reducers/session";
import recipesReducer from "./reducers/recipes";			
import { configureStore } from "@reduxjs/toolkit";
import criteriasReducer from "./reducers/criterias";
import filtersReducer from "./reducers/filters/filters";
import ingredientsReducer from "./reducers/ingredients";				
import familiesReducer from "./reducers/families";
import proposalReducer from "./reducers/proposal";
				
const store = configureStore({				
	reducer: {
		favorites:favoritesReducer, 
		historical_propositions:historicalPropositionsReducer,
		session:sessionReducer,
		recipes:recipesReducer, 
		criterias:criteriasReducer,
		filters:filtersReducer,
		ingredients:ingredientsReducer,
		families:familiesReducer,
		proposal:proposalReducer
	}			
})				
				
export default store;				
				
				
				