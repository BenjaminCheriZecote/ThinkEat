import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";

import types from "./types";
import actions from './actions'

const {handleClickDelete} = actions;


const initialState = {				
    recipes:null,
    recipesQuerry:null					
}						
						
const recipesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_RECIPES), (state, action) => {					
		state.recipes = action.payload				
	})
	.addCase(createAction(types.DELETE_RECIPE), (state, action) => {
		const {mealId} = action.payload;
		handleClickDelete(action);
		state.recipes = state.recipes.filter((recipe) => recipe.id !== mealId);
	})


})						
						
export default recipesReducer;	