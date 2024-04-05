import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";



export async function recipesLoader({request}){
    store.dispatch({type:types.SET_IS_ASIDE_TRUE});

    const {session} = store.getState();
  
    const url = new URL(request.url);
  
    const query = mappingUrlFunction(url);
    
    // récupération des familles d'ingrédients
    store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()})
    // récupération des ingrédients
    store.dispatch({type:types.SET_INGREDIENTS, payload: await IngredientApi.getAll()})
    // récupération des favoris
    if (session.isConnected) store.dispatch({type:types.SET_FAVORITES, payload: await UserApi.getRecipeToUser(null, session.id)})
    // récupération des recettes
    async function fetchDataRecipesApi() {
      const recipes = await RecipeApi.getAll(query);
      store.dispatch({type:types.SET_RECIPES, payload: recipes})
      return recipes
    }
    
    return fetchDataRecipesApi();
  }