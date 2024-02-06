import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	favorites:[{name:"Hamburger", hungry:"Grande faim", cooking_time:"Court"}, {name:"Pizza", hungry:"Grande faim", cooking_time:"Court"}, {name:"Tartiflète", hungry:"Grande faim", cooking_time:"Long"},  {name:"Pates", hungry:"Grande faim", cooking_time:"Court"}, {name:"Foie gras", hungry:"Petite faim", cooking_time:"Court"}, {name:"Salade", hungry:"Petite faim", cooking_time:"Long"}, {name:"Taboulet", hungry:"Petite faim", cooking_time:"Court"}, {name:"Patate", hungry:"Grande faim", cooking_time:"Court"}]					
}						
						
const favoritesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_FAVORITES"), (state, action) => {					
		state.favorites = action.payload				
	})			
})						
						
export default favoritesReducer;						