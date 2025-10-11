import { useSelector } from "react-redux";
import RecipesPage from "../../Layout/UXElements/components/RecipesPage/RecipesPage";
import { useLoaderData, useNavigate } from "react-router-dom";
import RecipeUX from "../../Layout/UXElements/components/RecipeUX";

const Recipes = () => {
    const title = "Recettes";
    const itemsTotal = useLoaderData();
    const navigate = useNavigate();
    const {recipes} = useSelector((state) => state.recipes);
    const {favorites} = useSelector((state) => state.favorites);

    const cancelHandler = () => navigate('/recipes')

    if (itemsTotal === "new") {
        return(
            <main className="section outlet">
                <RecipeUX formMethod={"POST"} cancelHandler={cancelHandler}/>
            </main>
        )
    }

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