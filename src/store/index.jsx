import favoritesReducer from "./reducers/favorites";
import historicalPropositionsReducer from './reducers/historicalPropositions'
import sessionReducer from "./reducers/session";
import recipesReducer from "./reducers/recipes";			
import { configureStore } from "@reduxjs/toolkit";
import criteriasReducer from "./reducers/criterias";
import filtersReducer from "./reducers/filters/filters";
import ingredientsReducer from "./reducers/ingredients";				
import familiesReducer from "./reducers/families";
import proposalReducer from "./reducers/proposal";
import unitReducer from "./reducers/unit";
import isAsideReducer from "./reducers/isAside";
				
const store = configureStore({				
	reducer: {
		favorites:favoritesReducer, 
		historicalPropositions:historicalPropositionsReducer,
		session:sessionReducer,
		recipes:recipesReducer, 
		criterias:criteriasReducer,
		filters:filtersReducer,
		ingredients:ingredientsReducer,
		families:familiesReducer,
		proposal:proposalReducer,
    	units:unitReducer,
		isAside: isAsideReducer
	}			
})				
				
export default store;				
				
				
				