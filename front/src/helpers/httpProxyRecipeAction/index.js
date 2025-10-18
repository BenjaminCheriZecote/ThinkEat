import { IngredientApi } from "../../api";

export const methods = {
    delete: "DELETE",
    put: "PUT",
    patch: "PATCH",
}

const httpProxyRecipeAction = async ( request ) => {
    const { method, recipeId, ingredientId, data } = request; 
    if (method === methods.delete)  return await IngredientApi.removeIngredientToRecipe(recipeId, ingredientId);
    if (method === methods.put) return await IngredientApi.addIngredientToRecipe(recipeId, ingredientId, data);
    if (method === methods.patch) return await IngredientApi.updateIngredientsRecipe(recipeId, ingredientId, data)
}

export default httpProxyRecipeAction;