import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";					
						
const initialState = {						
	criterias:[
        {numberOfProposition:0},
        {hungerBig:false},
        {hungerFew:false},
        {preparating_timeLong:false},
        {preparating_timeShort:false},
        {time:false},
        {diet_preferences:[{vegetarien:false}, {crudivore:false}, {calorique:false}, {gluten:false}]},
        {type_ingredients:null},
        {person:null},
        
    ],
    searchResult:[]					
}						
						
const criteriasReducer = createReducer (initialState, (builder) => {						
	builder
    .addCase(createAction("SET_FINDED_MEALS"), (state, action) => {					
		state.searchResult = action.payload	
	})
    .addCase(createAction("ADD_NUMBER_OF_PROPOSITION"), (state) => {					
		state.criterias[0].numberOfProposition = state.criterias[0].numberOfProposition + 1	
	})
    .addCase(createAction("SUBTRACT_NUMBER_OF_PROPOSITION"), (state) => {					
		state.criterias[0].numberOfProposition = state.criterias[0].numberOfProposition - 1	
	})
    .addCase(createAction("SET_HUNGER_BIG"), (state) => {					
		state.criterias[1].hungerBig = !state.criterias[1].hungerBig;				
	})
    .addCase(createAction("SET_HUNGER_FEW"), (state) => {					
		state.criterias[2].hungerFew = !state.criterias[2].hungerFew;				
	})
    .addCase(createAction("SET_PREPARATING_TIME_LONG"), (state) => {					
		state.criterias[3].preparating_timeLong = !state.criterias[3].preparating_timeLong	
	})
    .addCase(createAction("SET_PREPARATING_TIME_SHORT"), (state) => {					
		state.criterias[4].preparating_timeShort = !state.criterias[4].preparating_timeShort	
	})
})						
						
export default criteriasReducer;