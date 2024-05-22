import { UserApi, RecipeApi } from "../../../api";


const actions = {
    handleClickDeleteFavorites: async (action) => {
        const {id, mealId} = action.payload;
        await UserApi.removeRecipeToUser(id, mealId);
    },
    handleClickAddFavorites: async (action) => {
        const {id, mealId} = action.payload;
        await UserApi.addRecipeToUser(id, mealId);
    },
    handleClickDelete: async (action) => {
        const {id, mealId, favoritePage} = action.payload;
        await RecipeApi.delete(mealId);
        if (favoritePage) await UserApi.getRecipeToUser(null, id);
        
    },
    initColor: (mode) => {
        const root = document.documentElement;
        function turnColor(nameColor, newValue) {
        root.style.setProperty(nameColor, newValue);
        }
        
        if (mode === true) {
            turnColor('--colorbg1', '#414344');
            turnColor('--colorbg2', '#282a2c');
            turnColor('--colorbg3', '#282a2c');	
            turnColor('--colorUi1', 'rgb(211, 93, 57)');	
            turnColor('--colorUi2', 'white');
            turnColor('--colorUi3', 'rgb(211, 93, 57)');
            turnColor('--colorUi4', '#282a2c');
            turnColor('--colorbgAside1', 'rgb(211, 93, 57)');	
            turnColor('--colorbgAside2', 'rgb(211, 93, 57)');
            turnColor('--colorbgAside3', 'rgb(211, 93, 57)');
            turnColor('--colorFont1', '#e8eceb');
            turnColor('--colorShadow', 'rgba(255, 255, 255, 0.11)');
            turnColor('--colorShadow2', 'rgba(255, 255, 255, 0.400)');
            turnColor('--colorParagraph', '#cad7e0');
            turnColor('--colorUi5', '#cad7e0');
            turnColor('--colorProposition', 'black');
            turnColor('--colorSelectPlaceHolder', 'rgb(211, 93, 57)');
            turnColor('--colorLogo', 'rgba(202, 94, 61, 0.749)')
            
        }
        if (mode === false) {
          turnColor('--colorbg1', '#fefefe');
          turnColor('--colorbg2', '#e8eceb');
          turnColor('--colorbg3', '#e3eae9');	
          turnColor('--colorUi1', 'white');	
          turnColor('--colorUi2', 'rgb(211, 93, 57)');
          turnColor('--colorUi3', 'black');
          turnColor('--colorUi4', 'rgb(211, 93, 57)');	
          turnColor('--colorbgAside1', '#cadbd74a');	
          turnColor('--colorbgAside2', '#cccbdf');
          turnColor('--colorbgAside3', '#cad7e0');
          turnColor('--colorFont1', 'black');
          turnColor('--colorShadow', 'rgba(0,0,0,0.11)');
          turnColor('--colorShadow2', 'rgba(0,0,0,0.11)');
          turnColor('--colorParagraph', 'white');
          turnColor('--colorUi5', 'inherit');
          turnColor('--colorProposition', '#cad7e0');
          turnColor('--colorSelectPlaceHolder', '#ada28f');
          turnColor('--colorLogo', '#414344')
        }
    },
    setOffWidthRangeBar: () => {
        const allBarMultiRangeSlider = document.querySelectorAll(".bar");
		allBarMultiRangeSlider.forEach(bar => {
			bar.querySelector(".bar-left").style.width = "0%";
			bar.querySelector(".bar-right").style.width = "0%";
		})
    }

}

export default actions;