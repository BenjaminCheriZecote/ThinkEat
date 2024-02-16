import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";


const initialState = {						
	filters:[
        {hungerBigFilter:false, name:"Copieux"},
        {hungerNormalFilter:false, name:"Normal"},
        {hungerFewFilter:false, name:"Léger"},
        {preparatingTimeFilter:false, name:"Préparation"},
        {cookingTimeFilter:false, name:"Cuisson"},
        {favoriteFilter:true, name:"Favoris"},
        {familyIngredientFilter:false, name:"Catégorie d'ingrédients"},
        {ingredientFilter:false, name:"Ingrédients"},
        {time:false, name:"Temps"},
        {diet_preferences:[{vegetarien:false}, {crudivore:false}, {calorique:false}, {gluten:false}], name:"Régime alimentaire"},
        {type_ingredients:null},
        {person:null},
        {filter:false}
    ]				
}						
						
const filtersReducer = createReducer (initialState, (builder) => {						
	builder
    .addCase(createAction("SET_HUNGER_BIG_FILTER"), (state, action) => {					
		state.filters[0].hungerBigFilter = !state.filters[0].hungerBigFilter;				
	})
  .addCase(createAction("SET_HUNGER_NORMAL_FILTER"), (state) => {					
		state.filters[1].hungerNormalFilter = !state.filters[1].hungerNormalFilter;				
	})
    .addCase(createAction("SET_HUNGER_FEW_FILTER"), (state) => {					
		state.filters[2].hungerFewFilter = !state.filters[2].hungerFewFilter;				
	})
    .addCase(createAction("SET_PREPARATING_TIME_FILTER"), (state) => {					
		state.filters[3].preparatingTimeFilter = action.payload;
	})
    .addCase(createAction("SET_COOKING_TIME_FILTER"), (state) => {					
		state.filters[4].cookingTimeFilter = action.payload;	
	})
  .addCase(createAction("SET_FAVORITES_FILTER"), (state) => {					
		state.filters[5].favoriteFilter = !state.filters[5].favoriteFilter
	})
  .addCase(createAction("SET_FAMILY_FILTER"), (state) => {					
		state.filters[6].familyIngredientFilter = !state.filters[6].familyIngredientFilter
	})
  .addCase(createAction("SET_INGREDIENT_FILTER"), (state) => {					
		state.filters[7].ingredientFilter = !state.filters[7].ingredientFilter
	})
  .addCase(createAction("TURN_FILTER"), (state) => {					
		state.filters[12].filter = !state.filters[12].filter
	})

})						
						
export default filtersReducer;