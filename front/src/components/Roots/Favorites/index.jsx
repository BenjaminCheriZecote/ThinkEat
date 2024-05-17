import { useSelector } from "react-redux";
import RecipesPage from "../../Layout/UXElements/components/RecipesPage/RecipesPage";
import { useLoaderData } from "react-router-dom";

const Favorites = () => {
    const title = "Favoris";
    const {favorites} = useSelector((state) => state.favorites);
    const itemsTotal = useLoaderData();

    return(
        <RecipesPage 
        title={title} 
        recipes={favorites} 
        favoritePage={true}
        itemsTotal={itemsTotal}
        />
    )
}

export default Favorites;