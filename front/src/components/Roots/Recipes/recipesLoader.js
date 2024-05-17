import { FamilyApi, IngredientApi, RecipeApi, UnitApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";



export async function recipesLoader({request}){
    const {session, units, pagination} = store.getState();
    const {recipesPage} = pagination;
  
    const url = new URL(request.url);
  
    const query = mappingUrlFunction(url, recipesPage);
    
    // récupération des familles d'ingrédients
    store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()})
    // récupération des ingrédients
    store.dispatch({type:types.SET_INGREDIENTS, payload: await IngredientApi.getAll()})
    //récupération des unités
    let unitDb = await UnitApi.getAll();
    unitDb.unshift(units.units[0])
    store.dispatch({type:types.SET_UNIT, payload:unitDb})
    // récupération des favoris
    if (session.isConnected) store.dispatch({type:types.SET_FAVORITES, payload: await UserApi.getRecipeToUser(null, session.id)})
    // récupération des recettes
    async function fetchDataRecipesApi() {
      const recipes = await RecipeApi.getAll(query);
      store.dispatch({type:types.SET_RECIPES, payload: recipes})
      if (recipes.length > 0) {
        return recipes[0].total
      } else {
        return 0
      }
      
    }
    
    return fetchDataRecipesApi();
  }