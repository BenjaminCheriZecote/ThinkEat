import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit"					
						
const initialState = {

  //   numberOfProposition:0,
  //   hunger: [{name:"Copieux", state: false},{name:"Normal", state: false},{name:"Léger", state: false}],
  //   preparatingTime: {min:"00:00",max:"23:59"},
  //       // {nonFavoritesRecipesCriteria:false, name:"Recettes non favoris"},
  //       // {timeCriteria:false},
  //       // {diet_preferencesCriteria:[{vegetarien:false}, {crudivore:false}, {calorique:false}, {gluten:false}]},
  //       // {type_ingredientsCriteria:null},
  //       // {personCriteria:null},
  // },					
	criterias:[
        {numberOfProposition:0},
        {hungerBigCriteria:false, name:"Copieux"},
        {hungerFewCriteria:false, name:"Petite faim"},
        {preparating_timeLongCriteria:false, name:"Long"},
        {preparating_timeShortCriteria:false, name:"Court"},
        {nonFavoritesRecipesCriteria:false, name:"Recettes non favoris"},
        {timeCriteria:false},
        {diet_preferencesCriteria:[{vegetarien:false}, {crudivore:false}, {calorique:false}, {gluten:false}]},
        {type_ingredientsCriteria:null},
        {personCriteria:null},
    ],				
}						
						
const criteriasReducer = createReducer (initialState, (builder) => {						
	builder
    .addCase(createAction("ADD_NUMBER_OF_PROPOSITION"), (state) => {					
		state.criterias[0].numberOfProposition = state.criterias[0].numberOfProposition + 1	
	})
    .addCase(createAction("SUBTRACT_NUMBER_OF_PROPOSITION"), (state) => {					
		state.criterias[0].numberOfProposition = state.criterias[0].numberOfProposition - 1	
	})
    .addCase(createAction("SET_HUNGER_BIG_CRITERIA"), (state) => {					
		state.criterias[1].hungerBigCriteria = !state.criterias[1].hungerBigCriteria;				
	})
    .addCase(createAction("SET_HUNGER_FEW_CRITERIA"), (state) => {					
		state.criterias[2].hungerFewCriteria = !state.criterias[2].hungerFewCriteria;				
	})
    .addCase(createAction("SET_PREPARATING_TIME_LONG_CRITERIA"), (state) => {					
		state.criterias[3].preparating_timeLongCriteria = !state.criterias[3].preparating_timeLongCriteria	
	})
    .addCase(createAction("SET_PREPARATING_TIME_SHORT_CRITERIA"), (state) => {					
		state.criterias[4].preparating_timeShortCriteria = !state.criterias[4].preparating_timeShortCriteria	
	})
  .addCase(createAction("SET_NON_FAVORITES_RECIPES_CRITERIA"), (state) => {					
		state.criterias[5].nonFavoritesRecipesCriteria = !state.criterias[5].nonFavoritesRecipesCriteria
	})
})						
						
export default criteriasReducer;