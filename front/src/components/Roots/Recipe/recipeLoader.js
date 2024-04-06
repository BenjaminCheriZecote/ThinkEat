import { RecipeApi, UnitApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function recipeLoader({params}) {
    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    store.dispatch({type:types.ADD_UNIT, payload:await UnitApi.getAll()})

    const recipe = await RecipeApi.get(params.id);
    return recipe;
  }