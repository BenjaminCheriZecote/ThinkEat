import favoritesReducer from "./reducers/favorites";
import historcalPropositionsReducer from "./reducers/historical_propositions";
import sessionReducer from "./reducers/session";
import recipesReducer from "./reducers/recipes";			
import { configureStore } from "@reduxjs/toolkit";				
				
const store = configureStore({				
	reducer: {favorites:favoritesReducer, historical_propositions:historcalPropositionsReducer, session:sessionReducer, recipes:recipesReducer}			
})				
				
export default store;				
				
				
				