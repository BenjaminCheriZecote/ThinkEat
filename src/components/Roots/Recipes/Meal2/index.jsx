
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ModalUpdatingRecipe from "../ModalUpdatingRecipe";
import { IoStarOutline } from "react-icons/io5";


const Meal = ({meal, isAdmin}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const [updateMode, setUpdateMode] = useState(false);
    
    const handleClickDelete = () => {
        const newRecipes = recipes.filter((element) => element !== meal);
        store.dispatch({type:"SET_RECIPES", payload:newRecipes })
    }

    const handleClickUpdate = () => {
        setUpdateMode(true)
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, meal] })
    }

    const handleClickDeleteFavorites = () => {
        const updatedRecipes = favorites;
        const filteredFavorites = updatedRecipes.filter((element) => element.id !== meal.id);
        console.log("update", filteredFavorites)
        store.dispatch({type:"SET_FAVORITES", payload:filteredFavorites })
    }

    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <p>{meal.name}</p>
                    <NavLink to={`/recipes/${meal.id}`}>Voir la recette</NavLink>
                </div>
                <div className="section-li__container--options">
                    {!isAdmin?
                        favorites.find((element) => element.id === meal.id)?
                            <IoStarSharp onClick={handleClickDeleteFavorites}/>
                            :
                            <IoStarOutline onClick={handleClickAddFavorites}/>
                        :
                        <>
                            <FaPen onClick={handleClickUpdate}/>
                            <MdCancel onClick={handleClickDelete}/>
                        </>
                    }
                    {updateMode?
                    <ModalUpdatingRecipe meal={meal} setUpdateMode={setUpdateMode}/>
                    :
                    ""
                }
                </div>
                
        </li>
    )
}

export default Meal;