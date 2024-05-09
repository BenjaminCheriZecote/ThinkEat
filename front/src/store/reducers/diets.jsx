import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	diets:[],
	dietsChoices:[]					
}						
						
const dietsReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.ADD_ONE_DIETS_CHOICES), (state, action) => {					
		state.dietsChoices = [...state.dietsChoices, action.payload];				
	})
	.addCase(createAction(types.SET_DIETS_CHOICES), (state, action) => {					
		state.dietsChoices = action.payload;			
	})
})						
						
export default dietsReducer;