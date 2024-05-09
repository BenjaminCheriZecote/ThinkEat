import { useSelector } from "react-redux";
import RecipesPage from "../../Layout/UXElements/components/RecipesPage/RecipesPage";

const Favorites = () => {
    const title = "Favoris";
    const {favorites} = useSelector((state) => state.favorites);

    return(
        <RecipesPage 
        title={title} 
        recipes={favorites} 
        favoritePage={true}
        />
    )
}

export default Favorites;