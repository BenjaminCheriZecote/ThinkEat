import { useSelector } from "react-redux";

import RecipesPage from "../../Layout/UXElements/components/RecipesPage/RecipesPage";

const Recipes = () => {
    const title = "Recettes";
    const {recipes} = useSelector((state) => state.recipes);
    const {favorites} = useSelector((state) => state.favorites);

    return(
        <RecipesPage 
        title={title} 
        recipes={recipes}
        favorites={favorites}
        />
    )
}

export default Recipes;