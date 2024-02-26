
import store from "../../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditPen from "../../../Layout/UXElements/icons/EditPen";
import DeleteCruse from "../../../Layout/UXElements/icons/DeleteCruse";
import FavoriteStar from "../../../Layout/UXElements/icons/FavoriteStar";
import FavoriteStarOutline from "../../../Layout/UXElements/icons/FavoriteStarOutline";
import { RecipeApi } from "../../../../api";
import types from "../../../../store/reducers/types";
import RecipeUX from "../../../Layout/UXElements/components/RecipeUX";


const Meal = ({meal}) => {

    const {isConnected} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);
    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const [recipeDetails, setRecipeDetails] = useState()
    const [updateMode, setUpdateMode] = useState(false);
    
    const handleClickDelete = async () => {
        console.log("test");
        await RecipeApi.delete(meal.id);
        store.dispatch({type:types.SET_RECIPES, payload:await RecipeApi.getAll()});
    }

    const handleClickUpdate = async () => {
        const recipe = await RecipeApi.get(meal.id);
        console.log(recipe);
        setRecipeDetails(recipe);
        console.log(recipeDetails);
        setUpdateMode(true)
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:types.SET_FAVORITES, payload:[...favorites, meal] })
    }

    const handleClickDeleteFavorites = async () => {
        const updatedRecipes = favorites;
        const filteredFavorites = updatedRecipes.filter((element) => element.id !== meal.id);
        console.log("update", filteredFavorites)
        store.dispatch({type:types.SET_FAVORITES, payload:filteredFavorites })
    }


    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>
                <div className="section-li__container--options">
                    {isAdmin?
                        <>  
                        <button onClick={handleClickUpdate}>
                            <EditPen />

                        </button>
                            <button onClick={handleClickDelete}>
                                <DeleteCruse/>
                            </button>
                        </>
                        :
                        isConnected?
                        favorites.find((element) => element.id === meal.id)?
                            <FavoriteStar onClick={handleClickDeleteFavorites}/>
                            :
                            <FavoriteStarOutline onClick={handleClickAddFavorites}/>
                            :
                            ""
                    }
                    {updateMode&&
                    <>
                    <div className="backdrop">
                        <RecipeUX recipe={recipeDetails} modal={"modal"} cancelHandler={() => setUpdateMode(false)}/>
                    </div>
                    </>
                    // <ModalUpdatingRecipe meal={meal} setUpdateMode={setUpdateMode}/>
                    }
                </div>
                
        </li>
    )
}

export default Meal;