import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";
import types from "./types";
import actions from "./actions";

const {handleClickDeleteFavorites, handleClickAddFavorites, handleClickDelete} = actions;

			
const initialState = {	
	validate: true,					
	favorites:[]		
}						
						
const favoritesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_FAVORITES), (state, action) => {					
		state.favorites = action.payload				
	})
	.addCase(createAction(types.ADD_RECIPE_TO_FAVORITES), (state, action) => {
		const {meal} = action.payload;
		handleClickAddFavorites(action);			
		state.favorites = [...state.favorites, meal]				
	})
	.addCase(createAction(types.REMOVE_RECIPE_FROM_FAVORITES), (state, action) => {
		const {mealId} = action.payload;
		handleClickDeleteFavorites(action);
		state.favorites = state.favorites.filter((recipe) => recipe.id !== mealId);
	})
	.addCase(createAction(types.DELETE_FAVORITE), (state, action) => {
		const {mealId} = action.payload;
		handleClickDelete(action);
		state.favorites = state.favorites.filter((recipe) => recipe.id !== mealId);
	})
	
})						
						
export default favoritesReducer;						