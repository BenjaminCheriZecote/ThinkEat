import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	proposal:[]					
}						
						
const proposalReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_PROPOSAL), (state, action) => {					
		state.proposal = action.payload				
	})			
})						
						
export default proposalReducer;