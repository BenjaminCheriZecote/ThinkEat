import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UserApi } from "../api";

		
const sessionReducer = createReducer ({isConnected: false}, (builder) => {		
	builder	
  .addCase(createAction("SIGNIN"), (state, action) => {	
    return state = {...action.payload, isConnected: true};
	})
  .addCase(createAction("SIGNOUT"), (state) => {
    UserApi.signout();
		return state = {isConnected: false};
	});
})		

export default sessionReducer;