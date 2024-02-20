import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	historical_propositions:[]					
}						
						
const historicalPropositionsReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_HISTORIC"), (state, action) => {					
		state.historical_propositions = action.payload				
	})			
})						
						
export default historicalPropositionsReducer;