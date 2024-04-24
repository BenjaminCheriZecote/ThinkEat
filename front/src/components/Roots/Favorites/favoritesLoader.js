import { FamilyApi, IngredientApi, RecipeApi, UnitApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function favoritesLoader({request}){
  
  const urlClient = new URL(request.url);
  
  const query = mappingUrlFunction(urlClient); 
  
  const {session, units} = store.getState();
    
    store.dispatch({type:types.SET_RECIPES, payload: await RecipeApi.getAll(query)})
    store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()})
    store.dispatch({type:types.SET_INGREDIENTS, payload: await IngredientApi.getAll()})

    let unitDb = await UnitApi.getAll();
    unitDb.unshift(units.units[0])
    store.dispatch({type:types.SET_UNIT, payload:unitDb})
    
    async function fetchDataFavoritesRecipesApi() {
      const favorites = await UserApi.getRecipeToUser(query, session.id);
      store.dispatch({type:types.SET_FAVORITES, payload: favorites})
      return favorites
    }
    return fetchDataFavoritesRecipesApi();
}