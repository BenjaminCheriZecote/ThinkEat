import { useLoaderData} from "react-router-dom";

import RecipeUX from "../../Layout/UXElements/components/RecipeUX";

export default function RecipePage() {
  const recipe = useLoaderData();
  
  return(
    <main className="section outlet">
      <RecipeUX inUpdate={true} formMethod={"PATCH"} recipe={recipe}/>
    </main>
  )
}