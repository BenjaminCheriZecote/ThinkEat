import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function proposalLoader({request}){
  const urlClient = new URL(request.url);
  
  const state = store.getState();
  const {session} = state;
  const query = mappingUrlFunction(urlClient);

  const [families, ingredients, favorites, recipes] = await Promise.all([
    FamilyApi.getAll(),
    IngredientApi.getAll(),
    session.isConnected ? UserApi.getRecipeToUser(null, session.id) : Promise.resolve([]),
    await RecipeApi.getProposal(query)
  ]);



  store.dispatch({type:types.SET_FAMILIES, payload: families});
  store.dispatch({type:types.SET_INGREDIENTS, payload:ingredients});
  if (session.isConnected) {
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
  }

  store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: recipes})
  if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});

  return null
}