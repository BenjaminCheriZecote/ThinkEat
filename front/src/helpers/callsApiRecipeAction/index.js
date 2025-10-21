import { IngredientApi, RecipeApi } from "../../api";

export const methods = {
    delete: "DELETE",
    put: "PUT",
    patch: "PATCH",
    postImg: "POST_IMG",
    postImgName: "POST_IMG_NAME"
}

const callsApiRecipeAction = async ( request ) => {
    const { method, recipeId, ingredientId, data } = request;

    if (method === methods.delete) return await IngredientApi.removeIngredientToRecipe(recipeId, ingredientId);
    if (method === methods.put) return await IngredientApi.addIngredientToRecipe(recipeId, ingredientId, data);
    if (method === methods.patch) return await IngredientApi.updateIngredientsRecipe(recipeId, ingredientId, data);
    if (method === methods.postImg) return await RecipeApi.addImageToRecipe(recipeId, data.imageFile, data.nameFile);
    if (method === methods.postImgName) return await RecipeApi.updateImageNameToRecipe(recipeId, data);
}

export default callsApiRecipeAction;