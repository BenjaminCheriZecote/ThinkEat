import { FamilyApi, IngredientApi, RecipeApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function proposalLoader({request}){

    store.dispatch({type:types.SET_IS_ASIDE_TRUE});
    
    const urlClient = new URL(request.url);
    
    const query = mappingUrlFunction(urlClient);
    
    async function fetchDataRecipesApi() {
        const recipes = await RecipeApi.getAll(query);
        store.dispatch({type:types.SET_RECIPES, payload: recipes})
        return recipes
    }
    await fetchDataRecipesApi()
    
    async function fetchDataFamilyApi() {
        const families = await FamilyApi.getAll();
        store.dispatch({type:types.SET_FAMILIES, payload: families})
        return families 
      }
      await fetchDataFamilyApi()
    
      async function fetchDataIngredientApi() {
        const ingredients = await IngredientApi.getAll();
        store.dispatch({type:types.SET_INGREDIENTS, payload: ingredients})
        return ingredients
      }
      await fetchDataIngredientApi()
    
    return null
    }