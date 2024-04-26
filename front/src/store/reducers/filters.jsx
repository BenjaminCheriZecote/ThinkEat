import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";
import types from "./types";


const initialState = {	
    filters: {
        hunger: [{name:"Copieux", state: false},{name:"Normal", state: false},{name:"Léger", state: false}],
        preparatingTime: {min:"00:00:00",max:"05:59:59"},
        cookingTime: {min:"00:00:00",max:"05:59:59"},
        dietPreferences: [{name:"Vegetarien", state: false}, {name:"Vegetalien", state: false}, {name:"Crudivore", state:false}, {name:"Sans gluten", state: false}, {name:"Sans lactose", state: false}],
        favorites: {name:"Favoris", state:true},
    }					
}						
						
const filtersReducer = createReducer (initialState, (builder) => {						
	builder
    .addCase(createAction(types.SET_HUNGER_BIG), (state) => {					
		state.filters.hunger[0].state = !state.filters.hunger[0].state;				
	})
    .addCase(createAction(types.SET_HUNGER_NORMAL), (state) => {					
		state.filters.hunger[1].state = !state.filters.hunger[1].state;			
	})
    .addCase(createAction(types.SET_HUNGER_FEW), (state) => {					
		state.filters.hunger[2].state = !state.filters.hunger[2].state;				
	})
    .addCase(createAction(types.SET_PREPARATING_TIME), (state, action) => {					
		state.filters.preparatingTime = action.payload;
	})
    .addCase(createAction(types.SET_COOKING_TIME), (state, action) => {					
		state.filters.cookingTime = action.payload;	
	})
	.addCase(createAction(types.SET_FAVORITES_RECIPES), (state) => {					
		state.filters.favorites.state = !state.filters.favorites.state
	})
	.addCase(createAction(types.SET_PREPARATINGTIME_MIN), (state, action) => {					
		state.filters.preparatingTime.min = action.payload;
	})
	.addCase(createAction(types.SET_PREPARATINGTIME_MAX), (state, action) => {					
		state.filters.preparatingTime.max = action.payload;
	})
	.addCase(createAction(types.SET_COOKINGTIME_MIN), (state, action) => {					
		state.filters.cookingTime.min = action.payload;
	})
	.addCase(createAction(types.SET_COOKINGTIME_MAX), (state, action) => {					
		state.filters.cookingTime.max = action.payload;
	})
	.addCase(createAction(types.SET_OFF_FILTERS), (state) => {	
		state.filters.hunger[0].state = false;
		state.filters.hunger[1].state = false;
		state.filters.hunger[2].state = false;
		state.filters.preparatingTime.min = "00:00:00";
		state.filters.preparatingTime.max = "05:59:59";
		state.filters.cookingTime.min = "00:00:00";
		state.filters.cookingTime.max = "05:59:59";
	})
  
})						
						
export default filtersReducer;