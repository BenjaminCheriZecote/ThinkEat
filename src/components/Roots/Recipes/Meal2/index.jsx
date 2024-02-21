
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ModalUpdatingRecipe from "../ModalUpdatingRecipe";
import { IoStarOutline } from "react-icons/io5";
import { RecipeApi } from "../../../../store/api";
import types from "../../../../store/reducers/types";


const Meal = ({meal}) => {

    const {isConnected} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);
    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const [updateMode, setUpdateMode] = useState(false);
    
    const handleClickDelete = async () => {
        console.log("test")
        await RecipeApi.delete(meal.id);
        store.dispatch({type:types.SET_RECIPES, payload: await RecipeApi.getAll()});
    }

    const handleClickUpdate = () => {
        setUpdateMode(true)
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, meal] })
    }

    const handleClickDeleteFavorites = async () => {
        const updatedRecipes = favorites;
        const filteredFavorites = updatedRecipes.filter((element) => element.id !== meal.id);
        console.log("update", filteredFavorites)
        store.dispatch({type:"SET_FAVORITES", payload:filteredFavorites })
    }

    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>
                <div className="section-li__container--options">
                    {isAdmin?
                        <>
                            <FaPen onClick={handleClickUpdate}/>
                            <MdCancel onClick={handleClickDelete}/>
                        </>
                        :
                        isConnected?
                        favorites.find((element) => element.id === meal.id)?
                            <IoStarSharp onClick={handleClickDeleteFavorites}/>
                            :
                            <IoStarOutline onClick={handleClickAddFavorites}/>
                            :
                            ""
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