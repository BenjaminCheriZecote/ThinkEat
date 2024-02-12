import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	families:[]					
}						
						
const familiesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_FAMILIES"), (state, action) => {					
		state.families = action.payload				
	})			
})						
						
export default familiesReducer;