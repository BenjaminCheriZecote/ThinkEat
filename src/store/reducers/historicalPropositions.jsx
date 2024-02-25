import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	historicalPropositions:[]					
}						
						
const historicalPropositionsReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_HISTORIC"), (state, action) => {					
		state.historicalPropositions = action.payload				
	})			
})						
						
export default historicalPropositionsReducer;