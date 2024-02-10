import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
						
export const initialStateIngredients = {						
	ingredients:[
        {
            id:1,
            name:"Pain",
            image:"",
        },
    
        {
            id:2,
            name:"Salade",
            image:"",
            
        },
    
        {
            id:3,
            name:"Tomate",
            image:"",
            
        },
    
        {
            id:4,
            name:"Steak",
            image:"",
        },
    
        {
            id:5,
            name:"Fromage",
            image:"",
            
        },

        {
            id:6,
            name:"Foie gras",
            image:""
        },
        {
            id:7,
            name:"Confiture de figue",
            image:""
        },

        {
            id:8,
            name:"Pates",
            image:""
        },
        {
            id:9,
            name:"Sauce tomate",
            image:""
        },
        {
            id:10,
            name:"Gruyere",
            image:""
        },
        {
            id:11,
            name:"Steack haché",
            image:""
        },
        {
            id:12,
            name:"Oignon",
            image:"/oignon.jpg"
        },
        {
            id:13,
            name:"Echalotte",
            image:""
        },
        {
            id:14,
            name:"Noix de St Jacques",
            image:""
        },
        {
            id:15,
            name:"Beurre",
            image:""
        },
        {
            id:16,
            name:"Vin blanc",
            image:""
        },
        {
            id:17,
            name:"Farine",
            image:""
        },
        {
            id:18,
            name:"Bouillon de légumes",
            image:""
        },
        {
            id:19,
            name:"Chapelure",
            image:""
        },
        {
            id:20,
            name:"Patates",
            image:"/patates.jpeg"
        },
        {
            id:21,
            name:"Jambon",
            image:""
        },
        {
            id:22,
            name:"Chorizo",
            image:""
        },
        {
            id:23,
            name:"Sel",
            image:"/sel.jpg"
        },
        {
            id:24,
            name:"Poivre",
            image:"/poivre.jpg"
        },
        {
            id:25,
            name:"Reblochon",
            image:"/reblochon.jpg"
        },
        {
            id:26,
            name:"Huile d'olive",
            image:"/huileolive.png"
        },
        {
            id:27,
            name:"Lardons",
            image:"/lardon.png"
        },
        {
            id:28,
            name:"Ail",
            image:"/ail.png"
        },

    ]					
}						
						
const ingredientsReducer = createReducer (initialStateIngredients, (builder) => {						
	builder					
	.addCase(createAction("SET_INGREDIENTS"), (state, action) => {					
		state.ingredients = action.payload				
	})			
})						
						
export default ingredientsReducer;	