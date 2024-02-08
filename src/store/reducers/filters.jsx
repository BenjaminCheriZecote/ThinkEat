import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";


						
const initialState = {						
	filters:[
        {hungerBig:false, name:"Copieux"},
        {hungerFew:false, name:"Petite faim"},
        {preparating_timeLong:false, name:"Preparation longue"},
        {preparating_timeShort:false, name:"Preparation courte"},
        {time:false, name:"Temps"},
        {diet_preferences:[{vegetarien:false}, {crudivore:false}, {calorique:false}, {gluten:false}], name:"Régime alimentaire"},
        {type_ingredients:null},
        {person:null},
    ]				
}						
						
const filtersReducer = createReducer (initialState, (builder) => {						
	builder
    // .addCase(createAction("SET_FINDED_MEALS"), (state, action) => {					
	// 	state.searchResult = action.payload	
	// })
    .addCase(createAction("SET_HUNGER_BIG_FILTER"), (state) => {					
		state.filters[0].hungerBig = !state.filters[0].hungerBig;				
	})
    .addCase(createAction("SET_HUNGER_FEW_FILTER"), (state) => {					
		state.filters[1].hungerFew = !state.filters[1].hungerFew;				
	})
    .addCase(createAction("SET_PREPARATING_TIME_LONG_FILTER"), (state) => {					
		state.criterias[2].preparating_timeLong = !state.criterias[2].preparating_timeLong	
	})
    .addCase(createAction("SET_PREPARATING_TIME_SHORT_FILTER"), (state) => {					
		state.criterias[3].preparating_timeShort = !state.criterias[3].preparating_timeShort	
	})
})						
						
export default filtersReducer;