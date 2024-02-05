import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

const initialState = {		
	userName:null,
    isConnected:false,
	welcome:null,	
}		
		
const sessionReducer = createReducer (initialState, (builder) => {		
	builder	
	.addCase(createAction("USER"), (state, action) => {	
		state.userName = action.payload;
	})
    .addCase(createAction("IS_CONNECTED"), (state) => {	
		state.isConnected = true;
	})
    .addCase(createAction("IS_DISCONNECTED"), (state) => {	
		state.isConnected = false;
	})
	
})		
		
export default sessionReducer;		