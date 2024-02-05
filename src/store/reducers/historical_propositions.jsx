import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	historical_propositions:[]					
}						
						
const historcalPropositionsReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_HISTORIC"), (state, action) => {					
		state.historical_propositions = action.payload				
	})			
})						
						
export default historcalPropositionsReducer;