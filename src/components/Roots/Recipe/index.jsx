import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import RecipeUX from "../../Layout/UXElements/components/RecipeUX";

export default function RecipePage() {

  const { id } = useParams();
  const {recipes} = useSelector((state) => state.recipes);
  const recipe = recipes.find(recipe => recipe.id === parseInt(id));
  return(
    <main className="section">
      <RecipeUX recipe={recipe}/>
    </main>
  )
}