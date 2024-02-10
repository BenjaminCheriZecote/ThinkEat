
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ModalUpdatingRecipe from "../ModalUpdatingRecipe";

import { useRef } from "react";


const Meal = ({meal, isAdmin}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const [updateMode, setUpdateMode] = useState(false);
    
    const handleClickDelete = () => {
        const newRecipes = recipes.filter((element) => element !== meal);
        store.dispatch({type:"SET_RECIPES", payload:newRecipes })
    }

    const handleClickUpdate = (event) => {
        setUpdateMode(true)
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, meal] })
    }

    return(
        <li  className="section__li">
                {/* <div className="section-li__container--boxImg">
                    <img src={meal.image} alt="" />
                </div> */}
                <div className="section-li__container--boxLegend">
                    <p>{meal.name}</p>
                    <NavLink to={`/recipes/${meal.id}`}>Voir la recette</NavLink>
                </div>
                <div className="section-li__container--options">
                    {!isAdmin?
                        <IoStarSharp onClick={handleClickAddFavorites}/>
                        :
                        ""
                    }

                    {updateMode?
                    <ModalUpdatingRecipe meal={meal} setUpdateMode={setUpdateMode}/>
                    :
                    ""
                }
                    
                    {isAdmin?
                    <>
                        <FaPen onClick={handleClickUpdate}/>
                        <MdCancel onClick={handleClickDelete}/>
                    </>
                        :
                        ""}
                </div>
                
        </li>
    )
}

export default Meal;