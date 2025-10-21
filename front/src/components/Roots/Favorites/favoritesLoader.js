import { FamilyApi, IngredientApi, UnitApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function favoritesLoader({request}){
  
  const {session, units} = store.getState();
  const url = new URL(request.url);

  let query;

  if (!url.search.includes("page")) {
    query = mappingUrlFunction(url, "1");
  } else {
    query = mappingUrlFunction(url);
  }


  const [families, ingredients, unitDb, favorites] = await Promise.all([
    FamilyApi.getAll(),
    IngredientApi.getAll(),
    UnitApi.getAll(),
    UserApi.getRecipeToUser(query, session.id)
  ]);
  
    
  store.dispatch({type:types.SET_FAMILIES, payload: families})

  store.dispatch({type:types.SET_INGREDIENTS, payload: ingredients})

  unitDb.unshift(units.units[0]);
  store.dispatch({ type: types.SET_UNIT, payload: unitDb });
  
  store.dispatch({type:types.SET_UNIT, payload:unitDb})
  
  store.dispatch({type:types.SET_FAVORITES, payload: favorites})
  
  if (favorites.length > 0) {
    return favorites[0].total
  } else {
    return 0
  }
  
}