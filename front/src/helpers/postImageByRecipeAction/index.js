import { methods } from "../callsApiRecipeAction";

const postImageByRecipeAction = (editedRecipe, imageFile, arrayRequest) => {
    if (imageFile.name !== '') {
        const {id, image} = editedRecipe;
        const data = {
        imageFile:imageFile,
        nameFile: image,
        }
        arrayRequest.push({method:methods.postImg, recipeId:id, data:data});
    }
}

export default postImageByRecipeAction;