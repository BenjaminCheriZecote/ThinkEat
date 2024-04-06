import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import types from "./types";

const initialState = {
  units:[{id: 0, name: "Sans unité"}]
}
		
const unitReducer = createReducer (initialState, (builder) => {		
	builder
  .addCase(createAction(types.SET_UNIT), (state, action) => {	
    state.units = action.payload;
	})
  .addCase(createAction(types.ADD_UNIT), (state, action) => {	
    state.units = [...state.units, action.payload];
	});
})		

export default unitReducer;