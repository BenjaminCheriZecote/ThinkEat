import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	favoritesPage:1,
	recipesPage:1					
}						
						
const paginationReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_FAVORITES_PAGINATION), (state, action) => {					
		state.favoritesPage = action.payload;			
	})
	.addCase(createAction(types.SET_RECIPES_PAGINATION), (state, action) => {					
		state.recipesPage = action.payload;
	})
})						
						
export default paginationReducer;