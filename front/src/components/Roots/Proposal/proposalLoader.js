import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function proposalLoader({request}){
  
  const urlClient = new URL(request.url);
  
  const state = store.getState();
  const {session} = state;
  const query = mappingUrlFunction(urlClient);

  store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()});
  store.dispatch({type:types.SET_INGREDIENTS, payload:await IngredientApi.getAll()});
  if (session.isConnected) {
    const favorites = await UserApi.getRecipeToUser(null, session.id);
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
  }

  store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: await RecipeApi.getProposal(query)})
  if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});

  return null
}