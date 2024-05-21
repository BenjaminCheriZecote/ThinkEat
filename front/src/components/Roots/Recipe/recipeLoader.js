import { RecipeApi, UnitApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function recipeLoader({params}) {
    store.dispatch({type:types.SET_IS_ASIDE_FALSE});

    const [units, recipe] = await Promise.all([
      UnitApi.getAll(),
      RecipeApi.get(params.id)
    ]);
    store.dispatch({type:types.ADD_UNIT, payload:units})

    return recipe;
  }