import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	families:[],
	familiesChoices:[]					
}						
						
const familiesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_FAMILIES"), (state, action) => {					
		state.families = action.payload				
	})
	.addCase(createAction("ADD_ONE_FAMILY_CHOICES"), (state, action) => {					
		state.familiesChoices = [...state.familiesChoices, action.payload]				
	})
	.addCase(createAction("SET_FAMILIES_CHOICES"), (state, action) => {					
		state.familiesChoices = action.payload				
	})	
})						
						
export default familiesReducer;