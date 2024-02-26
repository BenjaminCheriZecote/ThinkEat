import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	proposal:{array:[]},
	starter:0					
}						
						
const proposalReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_PROPOSAL), (state, action) => {					
		state.proposal = action.payload				
	})
	.addCase(createAction(types.SET_STARTER), (state) => {					
		state.starter = state.starter + 1			
	})		
})						
						
export default proposalReducer;