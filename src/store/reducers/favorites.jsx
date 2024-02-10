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
	validate: true,					
	favorites:[
		{
            id:6,
            name:"Tartiflete",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Copieux",
            preparating_time:25,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:7,
            name:"Sandwich",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Petite faim",
            preparating_time:5,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:8,
            name:"Soupes de potirons",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Petite faim",
            preparating_time:30,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:9,
            name:"Hachi parmentier",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Copieux",
            preparating_time:40,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:10,
            name:"Taboulets à l'oriental",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Petite faim",
            preparating_time:10,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:11,
            name:"Lasagnes",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Copieux",
            preparating_time:45,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:12,
            name:"Pizzas",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Copieux",
            preparating_time:20,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:13,
            name:"Gratin de légumes",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Copieux",
            preparating_time:30,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
        },
        {
            id:14,
            name:"Salade niçoise",
            image:"/tartiflete.jpg",
            steps:["Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.", "Faire chauffer l'huile dans une poêle, y faire fondre les oignons.", "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.", "Lorsqu'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.", "D'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).", "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d'ail épluchée.", "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).", "Enfourner pour environ 20 minutes de cuisson."],
            hunger:"Petite faim",
            preparating_time:15,
            ingredients:[{
                id:12,
                name:"Oignon",
                image:"/oignon.jpg"
            },
            {
                id:20,
                name:"Patates",
                image:"/patate.jpg"
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
                image:"/ail.jpg"
            }]
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