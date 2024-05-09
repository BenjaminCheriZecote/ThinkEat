import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import types from "./types";
import actions from "./actions";

const {initColor} = actions;

const initialState = {
  mode:localStorage.getItem("darkMode")?JSON.parse(localStorage.getItem("darkMode")).boolean:null,
}
		
const darkModeReducer = createReducer (initialState, (builder) => {		
	builder
    .addCase(createAction(types.TURN_DARK_MODE), (state) => {

    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", JSON.stringify({ boolean: false }));
      state.mode = JSON.parse(localStorage.getItem("darkMode")).boolean;
    }
    if (localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", JSON.stringify({ boolean: !JSON.parse(localStorage.getItem("darkMode")).boolean }));
      state.mode = JSON.parse(localStorage.getItem("darkMode")).boolean;
    }

    initColor(state.mode);
	})
})		

export default darkModeReducer;