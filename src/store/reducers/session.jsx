import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UserApi } from "../api";

		
const sessionReducer = createReducer ({isConnected: false}, async (builder) => {		
	builder	
  .addCase(createAction("SIGNIN"), async (state, action) => {	
    const user = await UserApi.signin(action.payload)

    if (!user) {
      throw new Error("Erreur de connexion.");
    }
    state = {...user, isConnected: true};
	})
  .addCase(createAction("SIGNOUT"), (state) => {
    UserApi.signout();
		state = {isConnected: false};
	});
})		

export default sessionReducer;