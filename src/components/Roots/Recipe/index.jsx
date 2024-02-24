import { useLoaderData} from "react-router-dom";

import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { RecipeApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";

export default function RecipePage() {
  const recipe = useLoaderData();
  
  return(
    <main className="section outlet">
      <RecipeUX inUpdate={true} formMethod={"PATCH"}/>
    </main>
  )
}

export async function recipeLoader({params}) {
  store.dispatch({type:types.SET_IS_ASIDE_FALSE});
  return await RecipeApi.get(params.id);
}