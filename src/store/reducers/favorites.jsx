import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";

// {
//     id:1,
//     name:"Hamburger",
//     image:"",
//     steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
//     hunger:"big",
//     preparating_time:10,
//     ingredients:["pain", "salade", "tomate", "steak", "fromage"]
// },

// {name:"Tartiflète", hungry:"Grande faim", cooking_time:"Long"},  
						
const initialState = {						
	favorites:[
		{
            id:1,
            name:"Hamburger",
            image:"",
            steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
            hunger:"Copieux",
            preparating_time:10,
            ingredients:["pain", "salade", "tomate", "steak", "fromage"]
        },
		{
            id:2,
            name:"Toast de foie gras au figue",
            image:"",
            steps:["Toaster le foie gras sur du pain.", "Coucher la confiture sur le foie gras."],
            hunger:"Petite Faim",
            preparating_time:2,
            ingredients:["pain", "foie gras", "confiture de figue"]
        },
		{
            id:3,
            name:"Pates bolognaise",
            image:"",
            steps:["Cuire les pâtes et la viande hachée.", "Faire chauffer la sauce tomate", "Assembler pates et sauce, puis ajouter le sel"],
            hunger:"Copieux",
            preparating_time:7,
            ingredients:["pates", "sauce tomate", "gruyere", "steak haché", "oignon"]
        },
		{
            id:4,
            name:"Coquille St Jacques",
            image:"",
            steps:["Enorme flemme."],
            hunger:"Petite faim",
            preparating_time:30,
            ingredients:["échalotte", "noix de St Jacques", "beurre", "vin blanc", "farine", "bouillon de légume", "chapelure"]
        },
		{
            id:5,
            name:"Raclette",
            image:"",
            steps:["Faire chauffer les patate a la vapeur pendant 25 minutes.", "Chauffer le fromage dans un appareil à raclette"],
            hunger:"Copieux",
            preparating_time:25,
            ingredients:["patates", "fromage", "jambon", "chorizo"]
        }
	]					
}						
						
const favoritesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction("SET_FAVORITES"), (state, action) => {					
		state.favorites = action.payload				
	})			
})						
						
export default favoritesReducer;						