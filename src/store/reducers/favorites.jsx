import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
const initialState = {						
	favorites:[{name:"Hamburger", hungry:"Grande faim"}, {name:"Pizza", hungry:"Grande faim"}, {name:"Tartiflète", hungry:"Grande faim"},  {name:"Pates", hungry:"Grande faim"}, {name:"Foie gras", hungry:"Petite faim"}, {name:"Salade", hungry:"Petite faim"}, {name:"Taboulet", hungry:"Petite faim"}, {name:"Patate", hungry:"Grande faim"}]					
}						
						
const favoritesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_FAVORITES"), (state, action) => {					
		state.favorites = action.payload				
	})			
})						
						
export default favoritesReducer;						