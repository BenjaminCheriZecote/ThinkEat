import favoritesReducer from "./reducers/favorites";
import historcalPropositionsReducer from "./reducers/historical_propositions";
import sessionReducer from "./reducers/session";			
import { configureStore } from "@reduxjs/toolkit";				
				
const store = configureStore({				
	reducer: {favorites:favoritesReducer, historical_propositions:historcalPropositionsReducer, session:sessionReducer}			
})				
				
export default store;				
				
				
				