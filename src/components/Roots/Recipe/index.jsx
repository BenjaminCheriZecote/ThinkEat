import { useLoaderData} from "react-router-dom";

import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { RecipeApi } from "../../../store/api";

export default function RecipePage() {
  const recipe = useLoaderData();
  
  return(
    <main className="section">
      <RecipeUX inUpdate={true} formMethod={"PATCH"}/>
    </main>
  )
}

export async function recipeLoader({params}) {
  return await RecipeApi.get(params.id);
}