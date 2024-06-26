
import { NavLink } from "react-router-dom";
import RecipeUX from "./RecipeUX";
import DeleteCruse from "../icons/DeleteCruse";
import DeleteTrash from "../icons/DeleteTrash";
import EditPen from "../icons/EditPen";
import FavoriteStar from "../icons/FavoriteStar";
import FavoriteStarOutline from "../icons/FavoriteStarOutline";
import types from "../../../../store/reducers/types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RecipeApi} from "../../../../api";

const Meal = ({meal,favoritePage}) => {
    const dispatch = useDispatch()
    const {id, isConnected, isAdmin} = useSelector((state) => state.session)
    const {favorites} = useSelector((state) => state.favorites);
    const [recipeDetails, setRecipeDetails] = useState();
    const [updateMode, setUpdateMode] = useState(false);

    const handleClickUpdate = async () => {
        const recipe = await RecipeApi.get(meal.id);
        setRecipeDetails(recipe);
        setUpdateMode(true)
    }


    return(
        <li data-id={meal.id} className="section__li">
            <div className="section-li__container">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>

                {updateMode &&
                    <div className="backdrop">
                        <RecipeUX modal={"modal"} formMethod={"PATCH"} cancelHandler={() => setUpdateMode(false)} recipe={recipeDetails}/>
                    </div>
                    }

                <div className="section-li__container--options">
                    {/* 1ere partie, options favoris */}
                        {favoritePage ?
                        <DeleteCruse handleClick={() => dispatch({type:types.REMOVE_RECIPE_FROM_FAVORITES, payload:{id:id, mealId:meal.id}})} size={1}/>
                        :
                        isAdmin || !isConnected?
                        <></>
                        :
                        isConnected && favorites.find((element) => element.id === meal.id)?
                            <FavoriteStar handleClick={() => dispatch({type:types.REMOVE_RECIPE_FROM_FAVORITES, payload:{id:id, mealId:meal.id}})}/>
                            :
                            <FavoriteStarOutline handleClick={() => dispatch({type:types.ADD_RECIPE_TO_FAVORITES, payload:{id:id, mealId:meal.id, meal:meal}})}/>
                        }
                    {/* 2eme partie, options user */}
                        {id && (meal.userId === id) &&
                            <>
                                <EditPen handleClick={handleClickUpdate}/>
                                <DeleteTrash handleClick={() => dispatch({type:(favoritePage?types.DELETE_FAVORITE:types.DELETE_RECIPE), payload:{id:id, mealId:meal.id, favoritePage:favoritePage}})} size={15}/>
                            </>
                        }

                    {/* 3eme partie, options admin */}
                        {isAdmin && 
                        <>
                        <EditPen handleClick={handleClickUpdate}/>
                        <DeleteTrash handleClick={() => dispatch({type:types.DELETE_RECIPE, payload:{id:id, mealId:meal.id, favoritePage:favoritePage}})} size={15}/>
                        </>
                        }

                </div>


            </div>
            {/* <div className="section-li__container--legend">
                <p>{meal.hunger}, Préparation {meal.preparatingTime}, Cuisson {meal.cookingTime}</p>
            </div> */}
        </li>
    )
}

export default Meal;