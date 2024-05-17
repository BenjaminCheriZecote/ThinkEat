import { useSelector } from "react-redux";
import RecipesPage from "../../Layout/UXElements/components/RecipesPage/RecipesPage";
import { useLoaderData } from "react-router-dom";

const Recipes = () => {
    const title = "Recettes";
    const itemsTotal = useLoaderData();
    const {recipes} = useSelector((state) => state.recipes);
    const {favorites} = useSelector((state) => state.favorites);

    return(
        <RecipesPage 
        title={title} 
        recipes={recipes}
        favorites={favorites}
        itemsTotal={itemsTotal}
        />
    )
}

export default Recipes;