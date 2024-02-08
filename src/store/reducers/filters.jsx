import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";


const initialState = {						
	filters:[
        {hungerBigFilter:false, name:"Copieux"},
        {hungerFewFilter:false, name:"Petite faim"},
        {preparating_timeLongFilter:false, name:"Preparation longue"},
        {preparating_timeShortFilter:false, name:"Preparation courte"},
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
		state.filters[0].hungerBigFilter = !state.filters[0].hungerBigFilter;				
	})
    .addCase(createAction("SET_HUNGER_FEW_FILTER"), (state) => {					
		state.filters[1].hungerFewFilter = !state.filters[1].hungerFewFilter;				
	})
    .addCase(createAction("SET_PREPARATING_TIME_LONG_FILTER"), (state) => {					
		state.filters[2].preparating_timeLongFilter = !state.filters[2].preparating_timeLongFilter	
	})
    .addCase(createAction("SET_PREPARATING_TIME_SHORT_FILTER"), (state) => {					
		state.filters[3].preparating_timeShortFilter = !state.filters[3].preparating_timeShortFilter	
	})
})						
						
export default filtersReducer;