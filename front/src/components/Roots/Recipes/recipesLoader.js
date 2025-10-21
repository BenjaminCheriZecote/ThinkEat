import { FamilyApi, IngredientApi, RecipeApi, UnitApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers";
import store from "../../../store";
import types from "../../../store/reducers/types";



export async function recipesLoader({request}){
    const {session, units} = store.getState();
    
    let query;
    const url = new URL(request.url);

    if (url.search.startsWith('?new')) {
      store.dispatch({type:types.SET_IS_ASIDE_FALSE});

      const [ingredients, unitDb] = await Promise.all([
        IngredientApi.getAll(),
        UnitApi.getAll(),
      ]);

      store.dispatch({ type: types.SET_INGREDIENTS, payload: ingredients });

      unitDb.unshift(units.units[0]);
      store.dispatch({ type: types.SET_UNIT, payload: unitDb });
      return "new";
    }

    if (!url.search.includes("page")) {
      query = mappingUrlFunction(url, "1");
    } else {
      query = mappingUrlFunction(url);
    }

    const [families, ingredients, unitDb, favorites, recipes] = await Promise.all([
      FamilyApi.getAll(),
      IngredientApi.getAll(),
      UnitApi.getAll(),
      session.isConnected ? UserApi.getRecipeToUser(null, session.id) : Promise.resolve([]),
      RecipeApi.getAll(query)
    ]);

    // Dispatch les résultats des requêtes une fois qu'elles sont toutes terminées
    store.dispatch({ type: types.SET_FAMILIES, payload: families });
    store.dispatch({ type: types.SET_INGREDIENTS, payload: ingredients });

    // Préparer les unités et les dispatcher
    unitDb.unshift(units.units[0]);
    store.dispatch({ type: types.SET_UNIT, payload: unitDb });

    // Dispatcher les favoris si l'utilisateur est connecté
    if (session.isConnected) {
      store.dispatch({ type: types.SET_FAVORITES, payload: favorites });
    }
    store.dispatch({type:types.SET_RECIPES, payload: recipes})
    
    if (recipes.length > 0) {
      return recipes[0].total;
    } else {
      return 0
    }
  }